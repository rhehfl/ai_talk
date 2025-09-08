import { WebSocketServer } from "ws";
import { Message } from "common";
import { generateGeminiResponse } from "../service/aiService"; // 👈 AI 서비스 임포트

/**
 * 모든 클라이언트에게 메시지를 브로드캐스팅합니다.
 * @param wss - WebSocketServer 인스턴스
 * @param message - 전송할 메시지 객체
 */
function broadcast(wss: WebSocketServer, message: Message) {
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

/**
 * 수신된 메시지를 처리하고 AI 호출 여부를 결정합니다.
 * @param wss - WebSocketServer 인스턴스
 * @param data - 수신된 메시지 데이터
 */
export async function handleMessage(wss: WebSocketServer, data: string) {
  try {
    const userMessage: Message = JSON.parse(data);

    // 1. 받은 유저 메시지는 바로 브로드캐스팅
    broadcast(wss, userMessage);

    // 2. AI 호출 여부 확인
    if (userMessage.content.includes("@gemini")) {
      const prompt = userMessage.content.replace("@gemini", "").trim();
      const aiResponseContent = await generateGeminiResponse(prompt);

      const aiMessage: Message = {
        id: Date.now().toString(),
        author: "Gemini",
        content: aiResponseContent,
        timestamp: Date.now(),
      };

      // 3. AI의 답변을 다시 브로드캐스팅
      broadcast(wss, aiMessage);
    }
  } catch (error) {
    console.error("메시지 처리 중 오류 발생:", error);
  }
}
