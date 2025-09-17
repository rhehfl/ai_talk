import { GoogleGenAI } from "@google/genai";
import { Message } from "common";
import "dotenv/config";

const googleGenAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

async function callGemini(history: Message[]) {
  console.log("Calling Gemini API with history:", history);
  const contents = history.map((m) => ({
    role: m.author === "user" ? "user" : "model",
    parts: [{ text: m.content }],
  }));

  const response = await googleGenAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
    config: {
      systemInstruction: process.env.GEMINI_SYSTEM_PROMPT,
    },
  });

  console.log("Gemini response:", response);
  return response;
}

export default callGemini;
