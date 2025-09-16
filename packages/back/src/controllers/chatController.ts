import { WebSocketServer, WebSocket } from "ws";
import { ChatService } from "../services/chatService";
import { Message } from "common";

export class ChatController {
  constructor(private chatService: ChatService) {}

  public handleConnection(wss: WebSocketServer, ws: WebSocket) {
    ws.on("message", async (data: string) => {
      const message: Message = JSON.parse(data);

      if (message.isFirst) {
        const { finalSessionId, isNew } = this.chatService.initializeSession(
          message.sessionId,
        );

        if (isNew) {
          ws.send(
            JSON.stringify({
              type: "SESSION_CREATED",
              sessionId: finalSessionId,
            }),
          );
        }

        const history = this.chatService.getHistory(finalSessionId);
        ws.send(JSON.stringify({ type: "HISTORY", data: history }));
      } else {
        // const sessionId = chatService.getSessionId(ws);
        // if (sessionId) {
        //    const aiResponse = await this.chatService.processMessage(sessionId, message);
        //    // 모든 클라이언트에게 브로드캐스팅
        //    wss.clients.forEach(client => client.send(JSON.stringify(aiResponse)));
        // }
      }
    });

    ws.on("close", () => {
      /* chatService.removeClient(ws) 호출 */
    });
    ws.on("error", console.error);
  }
}
