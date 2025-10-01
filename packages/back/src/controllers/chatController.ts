import { WebSocket } from "ws";
import { ChatService } from "../services/chatService";
import { S2cBroadcastMessage } from "common";

export class ChatController {
  constructor(private chatService: ChatService) {}

  public async initialize(ws: WebSocket, sessionId: string | null) {
    if (!sessionId) return;
    await this.chatService.initializeSession(ws, sessionId);

    const history = await this.chatService.getHistory(sessionId);
    ws.send(JSON.stringify({ type: "HISTORY", content: history }));
  }

  public async handleMessage(ws: WebSocket, content: string) {
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
