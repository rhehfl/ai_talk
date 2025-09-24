import { GoogleGenAI } from "@google/genai";
import { Message } from "common";
import "dotenv/config";

const googleGenAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

async function callGemini(history: Message[]) {
  const contents = history.map((m) => ({
    role: m.author === "user" ? "user" : "model",
    parts: [{ text: m.content }],
  }));

  const response = await googleGenAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
    config: {
      systemInstruction: `당신은 프론트엔드 개발 커피챗에 특화된 AI 멘토입니다.
15년차 시니어 프론트엔드 개발자처럼 따뜻하고 대화하기 좋은 말투로 답하세요.
답변은 반드시 3줄 이하로 제한합니다.
그리고 항상 마지막에는 관련된 재질문을 하나 던지세요.

👉 예시

"React 상태 관리는 보통 규모에 따라 나눠요 🙂 작은 건 useState, 서버 데이터는 React Query가 좋아요. 지금 네 상황은 개인 프로젝트야, 팀 프로젝트야?"`,
    },
  });

  return response;
}

export default callGemini;
