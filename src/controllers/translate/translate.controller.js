const translate = require("../../services/translate/translate.services");
const supportedLanguages = require("../../config/languages.json");

const textTranslation = async (req, res) => {
    try {
        const { text, targetLang } = req.body;
        if (supportedLanguages[targetLang]) {
            const translation = await translate.translateText(text, supportedLanguages[targetLang]);
            return res.status(200).json({ msg: "OK", data: translation });
        }

        return res.status(400).json({ msg: "NOT_SUPPORTED_LANGUAGE", data: { targetLang } });
    } catch (err) {
        return res.status(500).json({ msg: "SOMETHING_WENT_WRONG", data: err.stack });
    }
}

const fileTranslation = async (req, res) => {
    try {
        let response = [];
        const { targetLang } = req.body;
        if (supportedLanguages[targetLang]) {
            for (let file of req.files) {
                const data = file.buffer.toString('utf8');
                const translation = await translate.translateText(data, supportedLanguages[targetLang]);
                response.push(translation);
            }

            return res.status(200).json({ msg: "OK", data: response });
        }

        return res.status(400).json({ msg: "NOT_SUPPORTED_LANGUAGE", data: { targetLang } });
    } catch (err) {
        return res.status(500).json({ msg: "SOMETHING_WENT_WRONG", data: err.stack });
    }
}

const supportedLngList = async (req, res) => {
    try {
        return res.status(200).json({ msg: "OK", data: supportedLanguages });
    } catch (err) {
        return res.status(500).json({ msg: "SOMETHING_WENT_WRONG", data: err.stack });
    }
}

module.exports = {
    textTranslation,
    fileTranslation,
    supportedLngList
}