import { ChatRoomRepository } from '@/chat_rooms/chat_rooms.repository';
import { RedisKey } from '@/utils/redis-key.util';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatRoomsService {
  constructor(private readonly chatRoomRepository: ChatRoomRepository) {}
  async createChatRoom(sessionId: string, personaId: number) {
    const roomId = RedisKey.getRoomId(sessionId, personaId);
    const userRoomsKey = RedisKey.getUserRoomsKey(sessionId);

    const roomExists = await this.chatRoomRepository.exists(roomId);

    if (!roomExists) {
      await this.chatRoomRepository.create(roomId, personaId);

      await this.chatRoomRepository.addUserRoom(userRoomsKey, roomId);
      console.log(`새로운 채팅방 생성: ${roomId}`);
    } else {
      console.log(`기존 채팅방 입장: ${roomId}`);
    }

    return { roomId };
    return `Chat room for persona ${personaId} created.`;
  }

  deleteChatRoom(roomId: string) {
    return `Chat room ${roomId} deleted.`;
  }

  getMyChatRooms() {
    return 'My chat rooms.';
  }
}
