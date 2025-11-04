// src/chat/chat.service.ts
import { ForbiddenException, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { RedisService } from '@/core/redis/redis.service';
import { Message } from 'common';
import { Chat } from '@/chat/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { is } from './../../../front/.next/server/vendor-chunks/next';
@Injectable()
export class ChatService {
  private redisClient: RedisClientType;
  private readonly MAX_HISTORY_LENGTH = 100;
  constructor(
    private readonly redisService: RedisService,
    @InjectRepository(Chat)
    private messageRepository: Repository<Chat>,
  ) {}

  async onModuleInit() {
    this.redisClient = this.redisService.getClient();
  }
  async getChatHistory(roomId: number): Promise<Message[]> {
    const key = `chat_messages:${roomId}`;
    const history = await this.redisClient.lRange(
      key,
      -this.MAX_HISTORY_LENGTH,
      -1,
    );

    if (history.length > 0) {
      return history.map((msg) => JSON.parse(msg));
    }

    const dbHistory = await this.messageRepository.find({
      where: { roomId },
      order: { createdAt: 'DESC' },
      take: this.MAX_HISTORY_LENGTH,
    });

    const reversedHistory = dbHistory.reverse();
    const multi = this.redisClient.multi();
    for (const msg of reversedHistory) {
      const cacheMsg: Message = { author: msg.author, content: msg.content };
      multi.rPush(key, JSON.stringify(cacheMsg));
    }
    await multi.exec();

    return dbHistory.map((msg) => ({
      author: msg.author,
      content: msg.content,
    }));
  }

  async saveChatMessage(
    roomId: number,
    message: Message,
    userId: string,
    personaId: number,
    isAuthenticated: boolean,
  ) {
    if (!isAuthenticated && message.author !== 'Gemini') {
      const userMessageCount = await this.messageRepository.count({
        where: { roomId, userId, author: 'user' },
      });

      if (userMessageCount >= 5) {
        throw new ForbiddenException(
          '익명 사용자는 한 채팅방에서 최대 5개의 메시지만 보낼 수 있습니다.',
        );
      }
    }

    try {
      const newChatMessage = this.messageRepository.create({
        roomId,
        author: message.author,
        content: message.content,
        userId: userId,
        personaId,
      });
      await this.messageRepository.save(newChatMessage);
    } catch (error) {
      console.error('DB 메시지 저장 실패:', error);
    }

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
