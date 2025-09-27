import { createClient } from "redis";
import { WebSocket } from "ws";
import { Message } from "common";

export class ChatRepository {
  private client;
  private wsToSessionId: Map<WebSocket, string> = new Map();

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || "redis://localhost:6379",
    });
    this.client.connect();
    console.log("✅ Redis client connected");
    this.client.on("error", (err) => {
      console.error("❌ CRITICAL REDIS ERROR:", err);
      process.exit(1);
    });
  }

  public mapClientToSession(ws: WebSocket, sessionId: string) {
    this.wsToSessionId.set(ws, sessionId);
  }

  public getSessionId(ws: WebSocket): string | undefined {
    return this.wsToSessionId.get(ws);
  }

  public removeClient(ws: WebSocket) {
    this.wsToSessionId.delete(ws);
  }

  // --- 아래부터 Redis를 사용하는 비동기 메서드 ---
  public async setPersona(sessionId: string, personaId: string) {
    await this.client.hSet("personas", sessionId, personaId);
  }

  public async getPersona(sessionId: string): Promise<string | undefined> {
    const persona = await this.client.hGet("personas", sessionId);
    return persona ?? undefined;
  }

  public async getHistory(sessionId: string): Promise<Message[]> {
    const key = `history:${sessionId}`;
    const historyJson = await this.client.get(key);

    if (!historyJson) {
      return [];
    }
    const history = JSON.parse(historyJson);
    if (Array.isArray(history)) {
      return history;
    } else {
      return [];
    }
  }

  public async setHistory(sessionId: string, history: Message[]) {
    const key = `history:${sessionId}`;
    await this.client.set(key, JSON.stringify(history));
  }

  public async addMessage(sessionId: string, message: Message) {
    const history = await this.getHistory(sessionId);
    history.push(message);
    await this.setHistory(sessionId, history);
  }
}
