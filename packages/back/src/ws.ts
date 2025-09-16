import { WebSocketServer } from "ws";
import http from "http";
import { ChatRepository } from "./repositories/chatRepository";
import { ChatService } from "./services/chatService";
import { ChatController } from "./controllers/chatController";
import { Message } from "common";

export default (server: http.Server) => {
  const wss = new WebSocketServer({ server });

  const chatRepository = new ChatRepository();
  const chatService = new ChatService(chatRepository);
  const chatController = new ChatController(chatService);

  wss.on("connection", (ws) => {
    console.log("🚀 클라이언트 연결됨");

    ws.on("message", (data: string) => {
      const message: Message = JSON.parse(data);

      if (message.type === "INIT") {
        chatController.initialize(ws, message.sessionId);
      } else {
        console.log("asdasdasd");
        chatController.handleMessage(wss, message);
      }
    });

    ws.on("close", () => {
      chatController.disconnect(ws);
    });

    ws.on("error", console.error);
  });
};
