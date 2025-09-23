import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import { ChatRepository } from "./repositories/chatRepository";
import { ChatService } from "./services/chatService";
import { ChatController } from "./controllers/chatController";
import { isC2sInit, isC2sSendMessage } from "common";
interface InitializedWebSocket extends WebSocket {
  isInitialized?: boolean;
}

export default (server: http.Server) => {
  const wss = new WebSocketServer({ server });

  const chatRepository = new ChatRepository();
  const chatService = new ChatService(chatRepository);
  const chatController = new ChatController(chatService);

  wss.on("connection", (ws: InitializedWebSocket) => {
    console.log("🚀 클라이언트 연결됨");
    ws.isInitialized = false;

    ws.on("message", (data: string) => {
      try {
        const message = JSON.parse(data);

        if (isC2sInit(message)) {
          chatController.initialize(ws, message.payload.sessionId);
          ws.isInitialized = true;
        } else if (ws.isInitialized && isC2sSendMessage(message)) {
          chatController.handleMessage(wss, ws, message.payload.content);
        } else if (!ws.isInitialized) {
          console.warn(
            "세션이 초기화되지 않은 클라이언트의 메시지를 무시합니다.",
          );
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
