import { createClient } from "redis";
import { WebSocket } from "ws";
import { Message } from "common";

export class ChatRepository {
  private client;
  private wsToSessionId: Map<WebSocket, string> = new Map();

  constructor() {
    this.client = createClient({
      // Docker Compose 환경 변수를 사용하거나, 없으면 로컬 주소를 사용
      url: process.env.REDIS_URL || "redis://localhost:6379",
    });
    this.client.connect().catch(console.error);
    console.log("✅ Redis client connected");
  }

  // ... (나머지 코드는 이전 답변과 동일합니다) ...
  // --- Session과 WebSocket 매핑은 계속 메모리에 유지 ---
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
    return historyJson ? JSON.parse(historyJson) : [];
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
