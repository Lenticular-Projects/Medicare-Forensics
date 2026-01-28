
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = "AIzaSyBX1qY1ChLcpuGdkcHd3_ImEqF6peYV8Fc";
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        // For listing models, we might not need to instantiate a specific model first,
        // but the SDK structure usually involves getting a model manager or similar.
        // However, the current JS SDK doesn't expose listModels directly on the main class in all versions.
        // Let's try a direct fetch if the SDK method isn't obvious, or check the SDK docs via search if this fails.
        // Actually, checking standard usage:
        // There isn't a direct listModels on GoogleGenerativeAI instance in some versions.
        // Let's try a direct REST call to be sure, as it avoids SDK version ambiguity.

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        console.log("Available Models:", JSON.stringify(data, null, 2));

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
