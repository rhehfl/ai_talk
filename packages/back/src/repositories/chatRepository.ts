import { WebSocket } from "ws";
import { Message } from "common";

export class ChatRepository {
  private histories = new Map<string, Message[]>();
  private clients = new Map<WebSocket, string>();

  public getHistory = (sessionId: string) => this.histories.get(sessionId);
  public setHistory = (sessionId: string, history: Message[]) =>
    this.histories.set(sessionId, history);
  public addMessage = (sessionId: string, message: Message) =>
    this.getHistory(sessionId)?.push(message);

  public getSessionId = (ws: WebSocket) => this.clients.get(ws);
  public mapClientToSession = (ws: WebSocket, sessionId: string) =>
    this.clients.set(ws, sessionId);
  public removeClient = (ws: WebSocket) => this.clients.delete(ws);
}
