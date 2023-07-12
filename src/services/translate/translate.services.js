const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const OPENAI = new OpenAIApi(configuration);

const translateText = async (text, targetLang) => {
    try {
        const response = await OPENAI.createCompletion({
            model: "text-davinci-003",
            prompt: `Translate this into ${targetLang}:${text}`,
            temperature: 0.3,
            max_tokens: 100,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });

        return response.data;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    translateText
}