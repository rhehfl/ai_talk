import { Injectable, NotFoundException } from '@nestjs/common';
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
    const { userId, personaId } = createDto;

    const existingRoom = await this.chatRoomRepository.findOne({
      where: { userId, persona: { id: personaId } },
    });

    if (existingRoom) {
      return existingRoom; // 이미 존재하면 기존 방 반환
    }

    // 2. 새로운 채팅방 생성 및 저장
    const newRoom = this.chatRoomRepository.create({
      userId,
      persona: { id: personaId },
    });
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

  /**
   * 3. DELETE: 특정 채팅방 ID로 삭제
   */
  async deleteChatRoom(
    id: number,
  ): Promise<{ deleted: boolean; message: string }> {
    const result = await this.chatRoomRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`ChatRoom with ID ${id} not found.`);
    }

    // 실제 채팅 앱에서는 이 시점에 해당 채팅방의 모든 메시지도 함께 삭제해야 합니다.
    return {
      deleted: true,
      message: `ChatRoom with ID ${id} successfully deleted.`,
    };
  }
}
