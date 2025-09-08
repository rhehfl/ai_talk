import { GoogleGenAI } from "@google/genai";
import { Message } from "common";
import "dotenv/config";

const googleGenAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

async function callGemini(history: Message[]) {
  const contents = history.map((m) => ({
    role: m.author === "AI" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
  console.log(
    "Gemini API 요청:",
    contents.map((c) => c.parts[0].text).join("\n---\n"),
  );

  const response = await googleGenAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
  });
  return response;
}

export default callGemini;
