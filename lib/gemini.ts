import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const gemini = {
  /**
   * Generates a text response from a prompt.
   */
  generateText: async (prompt: string, modelName: string = "gemini-2.0-flash-exp") => {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini GenerateText Error:", error);
      throw error;
    }
  },

  /**
   * Generates a JSON object from a prompt.
   * Handles JSON stripping and basic parsing.
   */
  generateJSON: async <T = any>(prompt: string, modelName: string = "gemini-2.0-flash-exp"): Promise<T> => {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: { responseMimeType: "application/json" }
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Basic cleanup if the model didn't perfectly follow MIME type
      const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

      return JSON.parse(cleanText) as T;
    } catch (error) {
      console.error("Gemini GenerateJSON Error:", error);
      throw error;
    }
  }
};
