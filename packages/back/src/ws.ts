import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import { broadcastMessage } from "./handlers";
import { Message } from "common";
import { callGemini } from "./client";

export default (server: http.Server) => {
  const wss = new WebSocketServer({ server });
  const histories = new Map<WebSocket, Message[]>(); // ws별 히스토리

  wss.on("connection", (ws) => {
    console.log("🚀 새로운 클라이언트가 연결되었습니다.");
    histories.set(ws, []); // 새 연결 초기화

    ws.on("message", async (data) => {
      const message: Message = JSON.parse(data.toString());

      // 히스토리에 user 메시지 추가
      const history = histories.get(ws)!;
      history.push({ ...message, author: "User" });

      // Gemini에 대화 전체 넘기기
      const res = await callGemini(history);

      // 모델 응답도 히스토리에 추가
      const aiMessage: Message = {
        author: "AI",
        content: res.text || "",
        timestamp: Date.now(),
        id: Date.now().toString(),
      };
      history.push(aiMessage);

      // 브로드캐스트
      broadcastMessage(wss, aiMessage);
    });

    ws.on("close", () => {
      console.log("🔌 클라이언트 연결이 끊어졌습니다.");
      histories.delete(ws); // 메모리 정리
    });

    ws.on("error", console.error);
  });
};
