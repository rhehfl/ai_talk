import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateChatRoomDto } from '@/chat_rooms/dto/create-chat-room.dto';
import { ChatRoom } from '@/chat_rooms/chat-room.entity';

@Injectable()
export class ChatRoomsService {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
  ) {}

  /**
   * 1. CREATE: 채팅방 생성 (이미 존재하는 경우, 기존 채팅방 반환)
   */
  async createChatRoom(createDto: CreateChatRoomDto): Promise<ChatRoom> {
    const { userId, personaId } = createDto;

    // 1. 기존 채팅방이 있는지 확인합니다 (@Unique 제약 조건 확인)
    const existingRoom = await this.chatRoomRepository.findOne({
      where: { userId, personaId },
    });

    if (existingRoom) {
      return existingRoom; // 이미 존재하면 기존 방 반환
    }

    // 2. 새로운 채팅방 생성 및 저장
    const newRoom = this.chatRoomRepository.create({ userId, personaId });
    return this.chatRoomRepository.save(newRoom);
  }

  /**
   * 2. READ: 특정 채팅방 ID로 조회
   */
  async getChatRoomById(id: number): Promise<ChatRoom> {
    const chatRoom = await this.chatRoomRepository.findOne({ where: { id } });

    if (!chatRoom) {
      throw new NotFoundException(`ChatRoom with ID ${id} not found.`);
    }

    return chatRoom;
  }
  async getAllChatRooms(userId: string): Promise<ChatRoom[]> {
    console.log(`Fetching all chat rooms for userId: ${userId}`);
    return this.chatRoomRepository.find({
      where: { userId },
      order: { updatedAt: 'DESC' },
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
