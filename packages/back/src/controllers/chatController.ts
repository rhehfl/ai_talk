// packages/back/src/controllers/chatController.ts

import { WebSocketServer, WebSocket } from "ws";
import { ChatService } from "../services/chatService";
import { Message } from "common";

export class ChatController {
  constructor(private chatService: ChatService) {}

  public initialize(ws: WebSocket, sessionId: string | null) {
    const { finalSessionId, isNew } =
      this.chatService.initializeSession(sessionId);

    if (isNew) {
      ws.send(
        JSON.stringify({ type: "SESSION_CREATED", sessionId: finalSessionId }),
      );
    }

    const history = this.chatService.getHistory(finalSessionId);
    ws.send(JSON.stringify({ type: "HISTORY", data: history }));
  }
  public async handleMessage(wss: WebSocketServer, userMessage: Message) {
    const sessionId = userMessage.sessionId;
    if (!sessionId) return;
    const aiMessage = await this.chatService.processMessage(
      sessionId,
      userMessage,
    );

    if (aiMessage) {
      this.broadcast(wss, aiMessage);
    }
  }

  public disconnect(ws: WebSocket) {
    this.chatService.endSession(ws);
  }

  private broadcast(wss: WebSocketServer, message: Message) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }
}
