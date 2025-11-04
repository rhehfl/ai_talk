import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateChatRoomDto } from '@/chat_rooms/dto/create-chat-room.dto';
import { ChatRoom } from '@/chat_rooms/chat-room.entity';
import { User } from '@/user/user.entity';

@Injectable()
export class ChatRoomsService {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * 1. CREATE: 채팅방 생성 (이미 존재하는 경우, 기존 채팅방 반환)
   */
  async createChatRoom(createDto: CreateChatRoomDto): Promise<ChatRoom> {
    const { userId, personaId, isAuthenticated } = createDto;

    const existingRoom = await this.chatRoomRepository.findOne({
      where: { userId, persona: { id: personaId } },
    });

    if (existingRoom) {
      return existingRoom;
    }

    if (!isAuthenticated) {
      const ANONYMOUS_ROOM_LIMIT = 5;
      const roomCount = await this.chatRoomRepository.count({
        where: { userId },
      });

      if (roomCount >= ANONYMOUS_ROOM_LIMIT) {
        throw new ForbiddenException(
          `익명 사용자는 채팅방을 ${ANONYMOUS_ROOM_LIMIT}개까지만 생성할 수 있습니다. 로그인해 주세요.`,
        );
      }
    }

    const newRoom: Partial<ChatRoom> = this.chatRoomRepository.create({
      userId,
      persona: { id: personaId },
    });
    if (isAuthenticated) {
      const user = await this.userRepository.findOneBy({ id: userId });
      if (user) {
        newRoom.user = user;
      }
    }

    return this.chatRoomRepository.save(newRoom);
  }

  async getChatRoomById(roomId: number, userId: string): Promise<ChatRoom> {
    const chatRoom = await this.chatRoomRepository.findOne({
      where: { id: roomId },
      select: {
        id: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        persona: { id: true, name: true, prompt: true, image: true },
      },
      relations: ['persona'],
    });

    if (!chatRoom) {
      throw new NotFoundException(`ChatRoom with ID ${roomId} not found.`);
    }

    if (chatRoom.userId !== userId) {
      throw new NotFoundException(
        `ChatRoom with ID ${roomId} not found for this user.`,
      );
    }

    return chatRoom;
  }
  async getAllChatRooms(userId: string): Promise<ChatRoom[]> {
    return this.chatRoomRepository.find({
      where: { userId },
      order: { updatedAt: 'DESC' },
      select: {
        id: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        persona: { id: true, name: true, image: true },
      },
      relations: ['persona'],
    });
  }

  async deleteChatRoom(
    id: number,
    userId: string, // 8. [수정] userId를 받음
  ): Promise<{ deleted: boolean; message: string }> {
    // 9. [수정] id와 userId가 모두 일치해야 삭제
    const result = await this.chatRoomRepository.delete({ id, userId });

    if (result.affected === 0) {
      throw new NotFoundException(
        `ChatRoom with ID ${id} not found or access denied.`,
      );
    }

    return {
      deleted: true,
      message: `ChatRoom with ID ${id} successfully deleted.`,
    };
  }
}
