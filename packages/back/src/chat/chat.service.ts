// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { RedisService } from '@/core/redis/redis.service';
import { Message } from 'common';
@Injectable()
export class ChatService {
  private redisClient: RedisClientType;
  private readonly MAX_HISTORY_LENGTH = 100;
  constructor(private readonly redisService: RedisService) {}

  async onModuleInit() {
    this.redisClient = this.redisService.getClient();
  }
  async getChatHistory(roomId: number): Promise<Message[]> {
    const history = await this.redisClient.lRange(
      `chat_messages:${roomId}`,
      -this.MAX_HISTORY_LENGTH,
      -1,
    );
    return history.map((msg) => JSON.parse(msg));
  }
  async saveChatMessage(roomId: number, message: Message) {
    const key = `chat_messages:${roomId}`;
    await this.redisClient.rPush(key, JSON.stringify(message));
    await this.redisClient.lTrim(key, -this.MAX_HISTORY_LENGTH, -1);
  }
  async setSystemInstruction(roomId: number, prompt: string): Promise<void> {
    const key = `chat:room:${roomId}:prompt`;
    await this.redisClient.hSet(key, 'systemInstruction', prompt);
  }
  async getSystemInstruction(roomId: number): Promise<string | null> {
    const key = `chat:room:${roomId}:prompt`;
    return await this.redisClient.hGet(key, 'systemInstruction');
  }
}
