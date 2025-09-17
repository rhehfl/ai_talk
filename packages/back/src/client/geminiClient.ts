import { GoogleGenAI } from "@google/genai";
import { Message } from "common";
import "dotenv/config";

const googleGenAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

async function callGemini(history: Message[]) {
  const contents = history.map((m) => ({
    role: m.author === "user" ? "user" : "model",
    parts: [{ text: m.content }],
  }));
  console.log("Calling Gemini with contents:", contents);

  const response = await googleGenAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
  });
  console.log("Gemini Response:", response);
  return response;
}

export default callGemini;
