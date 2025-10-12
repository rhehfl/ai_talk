import { Message } from "common";
import { WebSocketServer } from "ws";

export function broadcastMessage(wss: WebSocketServer, message: Message) {
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}
