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
        
        let str = completion.data.choices[0].message.content;
        str = text[text.length - 1] != "." ? str.substring(0, str.length - 1) : str;

        return str;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    translateText
}