// packages/back/src/controllers/chatController.ts

import { WebSocketServer, WebSocket } from "ws";
import { ChatService } from "../services/chatService";
import { Message, S2cBroadcastMessage, S2cSessionCreated } from "common";

export class ChatController {
  constructor(private chatService: ChatService) {}

  public initialize(ws: WebSocket, sessionId: string | null) {
    const { finalSessionId, isNew } = this.chatService.initializeSession(
      sessionId,
      ws,
    );

    if (isNew) {
      const sessionMsg: S2cSessionCreated = {
        type: "S2C_SESSION_CREATED",
        payload: { sessionId: finalSessionId },
      };
      ws.send(JSON.stringify(sessionMsg));
    }
    const history = this.chatService.getHistory(finalSessionId);
    ws.send(JSON.stringify({ type: "HISTORY", content: history }));
  }

  public async handleMessage(
    wss: WebSocketServer,
    ws: WebSocket,
    content: string,
  ) {
    const aiMessage = await this.chatService.processMessage(ws, content);
    if (!aiMessage) return;

    const broadcastMsg: S2cBroadcastMessage = {
      type: "S2C_BROADCAST_MESSAGE",
      payload: aiMessage,
    };
    ws.send(JSON.stringify(broadcastMsg));
  }

  public disconnect(ws: WebSocket) {
    this.chatService.endSession(ws);
  }
}
