import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const googleGenAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

async function callGemini(prompt: string) {
  const response = await googleGenAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });
  return response;
}

export default callGemini;
