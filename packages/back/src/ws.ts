import { WebSocketServer } from "ws";
import http from "http";
import { ChatRepository } from "./repositories/chatRepository";
import { ChatService } from "./services/chatService";
import { ChatController } from "./controllers/chatController";

export default (server: http.Server) => {
  const wss = new WebSocketServer({ server });

  const chatRepository = new ChatRepository();
  const chatService = new ChatService(chatRepository);
  const chatController = new ChatController(chatService);

  wss.on("connection", (ws) => {
    chatController.handleConnection(wss, ws);
  });
};
