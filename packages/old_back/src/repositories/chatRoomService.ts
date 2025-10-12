import { RedisClientType } from "redis";
import { WebSocket } from "ws";

export class ChatRepository {
  private client;
  private wsToSessionId: Map<WebSocket, string> = new Map();

  constructor(redisClient: RedisClientType) {
    this.client = redisClient;
  }
}
