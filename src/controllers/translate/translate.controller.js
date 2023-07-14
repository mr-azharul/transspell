const translate = require("../../services/translate/translate.services");
const supportedLanguages = ["Afrikaans", "Arabic", "Armenian", "Azerbaijani", "Belarusian", "Bosnian", "Bulgarian", "Catalan", "Chinese", "Croatian", "Czech", "Danish",
    "Dutch", "English", "Estonian", "Finnish", "French", "Galician", "German", "Greek", "Hebrew", "Hindi", "Hungarian", "Icelandic", "Indonesian", "Italian", "Japanese",
    "Kannada", "Kazakh", "Korean", "Latvian", "Lithuanian", "Macedonian", "Malay", "Marathi", "Maori", "Nepali", "Norwegian", "Persian", "Polish", "Portuguese", "Romanian",
    "Russian", "Serbian", "Slovak", "Slovenian", "Spanish", "Swahili", "Swedish", "Tagalog", "Tamil", "Thai", "Turkish", "Ukrainian", "Urdu", "Vietnamese", "Welsh"];


const textTranslation = async (req, res) => {
    try {
        const { text, targetLang } = req.body;
        const translation = await translate.translateText(text, targetLang);

        return res.status(200).json({ msg: "OK", data: translation });
    } catch (err) {
        return res.status(500).json({ msg: err.message, data: err });
    }
}

module.exports = {
    textTranslation
}