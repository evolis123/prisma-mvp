const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async function (event, context) {
     if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { prompt } = JSON.parse(event.body);
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return {
            statusCode: 200,
            body: JSON.stringify({ response: text }),
        };
    } catch (error) {
        console.error("AI funksiyasında xəta:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "AI servisində bir problem yarandı." }),
        };
    }
};