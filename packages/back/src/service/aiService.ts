import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * 주어진 프롬프트로 Gemini API를 호출하고 응답 텍스트를 반환합니다.
 * @param prompt - AI에게 보낼 질문
 * @returns AI의 응답 텍스트
 */
export async function generateGeminiResponse(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API 호출 중 에러 발생:", error);
    return "죄송합니다. 답변을 생성하는 데 문제가 발생했습니다.";
  }
}
