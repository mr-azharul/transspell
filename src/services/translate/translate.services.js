const cheerio = require('cheerio');
const mammoth = require('mammoth');
const pdfParse = require('pdf-parse');
const XML2JS = require('xml2js');
const gettextParser = require("gettext-parser");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const OPENAI = new OpenAIApi(configuration);

const translateText = async (text, targetLang) => {
    try {
        const completion = await OPENAI.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "system", "content": "You are a helpful assistant." },
                { "role": "user", "content": `Translate the following text to ${targetLang}: ${text}` }
            ],
        });

        let translation = completion.data.choices[0].message.content;
        translation = text[text.length - 1] != "." ? translation.substring(0, translation.length - 1) : translation;

        return translation;
    } catch (err) {
        throw new Error(err.message);
    }
}

const translatePOFile = async (buffer, targetLang) => {
    try {
        const poData = gettextParser.po.parse(buffer);
        const translations = poData.translations;
        for (const key in translations) {
            if (translations.hasOwnProperty(key)) {
                const translation = translations[key];
                if (translation.msgstr && translation.msgstr.length > 0) {
                    translation.msgstr[0] = await translateText(translation.msgstr[0], targetLang);
                }
            }
        }

        const translatedPo = gettextParser.po.compile({ translations });
        return translatedPo.toString();
    } catch (err) {
        throw new Error(err.message);
    }
}

const translateHTMLFile = async (data, targetLang) => {
    try {
        const $ = cheerio.load(data);
        const elementsToTranslate = $('title, p, span, div, h1, h2, h3, h4, h5, h6');
        for (let element of elementsToTranslate) {
            const originalText = $(element).text().trim();
            const translation = await translateText(originalText, targetLang);
            $(element).text(translation);
        }

        const translatedHTML = $.html();
        return translatedHTML;
    } catch (err) {
        throw new Error(err.message);
    }
}

const translateDOCXFile = async (buffer, targetLang) => {
    try {
        return mammoth.extractRawText({ buffer: buffer }).then((result) => translateText(result.value, sourceLang, targetLang));
    } catch (err) {
        throw new Error(err.message);
    }
}

const translatePDFFile = async (buffer, targetLang) => {
    try {
        return pdfParse(buffer).then((pdfData) => translateText(pdfData.text, targetLang));
    } catch (err) {
        throw new Error(err.message);
    }
}

const translateXMLFile = async (data, targetLang) => {
    try {
        return new Promise((resolve, reject) => {
            XML2JS.parseString(data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const translatedXml = JSON.stringify(result);
                    translateText(translatedXml, targetLang).then(resolve);
                }
            });
        });
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    translateText,
    translatePOFile,
    translateHTMLFile,
    translateDOCXFile,
    translatePDFFile,
    translateXMLFile
}