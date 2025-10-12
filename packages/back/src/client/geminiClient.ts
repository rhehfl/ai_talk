import { GoogleGenAI } from "@google/genai";
import { Message } from "common";
import "dotenv/config";

const googleGenAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

async function callGemini(history: Message[], systemInstruction: string) {
  let responseMessage = "";

  const contents = history.map((m) => ({
    role: m.author === "user" ? "user" : "model",
    parts: [{ text: m.content }],
  }));

  try {
    const response = await googleGenAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction,
      },
    });
    if (!response.text) throw new Error("Gemini API 응답이 없습니다.");
    responseMessage = response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Gemini API 호출 중 오류가 발생했습니다.");
  }

  return responseMessage;
}

export default callGemini;
