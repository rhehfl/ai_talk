import { GoogleGenAI } from "@google/genai";
import { Message } from "common";
import "dotenv/config";

const googleGenAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

async function callGemini(history: Message[]) {
  const contents = history.map((m) => ({
    role: m.author === "AI" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const response = await googleGenAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
  });
  return response;
}

export default callGemini;
