// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { RedisService } from '@/core/redis/redis.service';
import { Message } from 'common';
@Injectable()
export class ChatService {
  private redisClient: RedisClientType;
  constructor(private readonly redisService: RedisService) {}

  async onModuleInit() {
    this.redisClient = this.redisService.getClient();
  }
  async getChatHistory(roomId: number): Promise<Message[]> {
    const history = await this.redisClient.lRange(
      `chat_messages:${roomId}`,
      0,
      -1,
    );
    return history.map((msg) => JSON.parse(msg));
  }
  async saveChatMessage(roomId: number, message: Message) {
    this.redisClient.lPush(`chat_messages:${roomId}`, JSON.stringify(message));
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
