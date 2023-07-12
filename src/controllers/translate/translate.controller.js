const translate = require("../../services/translate/translate.services");

const textTranslation = async (req, res) => {
    try {
        const { text, targetLang } = req.body;
        const translation = translate.translateText(text, targetLang);

        return res.status(200).json({ msg: "OK", data: translation });
    } catch (err) {
        return res.status(500).json({ msg: err.message, data: err });
    }
}

module.exports = {
    textTranslation
}