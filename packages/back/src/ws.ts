import { WebSocketServer } from "ws";
import http from "http";
import { ChatRepository } from "./repositories/chatRepository";
import { ChatService } from "./services/chatService";
import { ChatController } from "./controllers/chatController";
import { isC2sInit, isC2sSendMessage, Message } from "common";

export default (server: http.Server) => {
  const wss = new WebSocketServer({ server });

  const chatRepository = new ChatRepository();
  const chatService = new ChatService(chatRepository);
  const chatController = new ChatController(chatService);

  wss.on("connection", (ws) => {
    console.log("🚀 클라이언트 연결됨");

    ws.on("message", (data: string) => {
      try {
        const message = JSON.parse(data);

        if (isC2sInit(message)) {
          chatController.initialize(ws, message.payload.sessionId);
        } else if (isC2sSendMessage(message)) {
          chatController.handleMessage(wss, ws, message.payload.content);
        }
      } catch (error) {
        console.error("메시지 처리 중 오류:", error);
      }
    });

    ws.on("close", () => {
      chatController.disconnect(ws);
    });

    ws.on("error", console.error);
  });
};
