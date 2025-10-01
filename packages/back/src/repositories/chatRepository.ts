import { RedisClientType } from "redis";
import { WebSocket } from "ws";
import { Message } from "common";

export class ChatRepository {
  private client;
  private wsToSessionId: Map<WebSocket, string> = new Map();

  constructor(redisClient: RedisClientType) {
    this.client = redisClient;
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

  public async getHistory(
    sessionId: string,
    personaId: number,
  ): Promise<Message[]> {
    const key = `history:${sessionId}:${personaId}`;
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

  public async setHistory(
    sessionId: string,
    personaId: number,
    history: Message[],
  ) {
    const key = `history:${sessionId}:${personaId}`;
    await this.client.set(key, JSON.stringify(history));
  }

  public async addMessage(
    sessionId: string,
    personaId: number,
    message: Message,
  ) {
    const history = await this.getHistory(sessionId, personaId);
    history.push(message);
    await this.setHistory(sessionId, personaId, history);
  }
}
