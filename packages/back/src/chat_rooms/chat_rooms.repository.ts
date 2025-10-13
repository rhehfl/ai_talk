import { Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { RedisService } from '@/core/redis/redis.service';

@Injectable()
export class ChatRoomRepository {
  private readonly redisClient: RedisClientType;

  constructor(private readonly redisService: RedisService) {
    this.redisClient = this.redisService.getClient();
  }

  async exists(roomId: string): Promise<boolean> {
    const result = await this.redisClient.exists(roomId);
    return result === 1;
  }

  async create(roomId: string, personaId: number): Promise<void> {
    await this.redisClient.hSet(roomId, {
      personaId,
      createdAt: new Date().toISOString(),
    });
  }

  async addUserRoom(userRoomId: string, roomId: string): Promise<void> {
    await this.redisClient.sAdd(userRoomId, roomId);
  }

  async delete(sessionId: string, roomId: string): Promise<void> {
    const roomKey = `room:${roomId}`;
    const userRoomsKey = `user:${sessionId}:rooms`;

    await this.redisClient
      .multi()
      .del(roomKey)
      .sRem(userRoomsKey, roomId)
      .exec();
  }
}
