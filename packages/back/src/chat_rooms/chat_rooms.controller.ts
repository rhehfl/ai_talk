// src/chatroom/chatroom.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ChatRoomsService } from '@/chat_rooms/chat_rooms.service';
import { CreateChatRoomDto } from '@/chat_rooms/dto/create-chat-room.dto';
import { ChatRoom } from '@/chat_rooms/chat-room.entity';
import { Request } from 'express';

@Controller('chatrooms')
export class ChatRoomsController {
  constructor(private readonly chatRoomsService: ChatRoomsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createDto: CreateChatRoomDto,
    @Req() req: Request,
  ): Promise<ChatRoom> {
    const sessionId = req.cookies['chat_session_id'];
    if (!sessionId) {
      throw new UnauthorizedException(
        'Missing chat_session_id cookie. Please log in.',
      );
    }

    const completeDto = {
      userId: sessionId,
      personaId: createDto.personaId,
    };

    return this.chatRoomsService.createChatRoom(completeDto);
  }

  @Get()
  findAll(@Req() req: Request): Promise<ChatRoom[]> {
    const sessionId = req.cookies['chat_session_id'];
    if (!sessionId) {
      throw new UnauthorizedException(
        'Missing chat_session_id cookie. Please log in.',
      );
    }

    return this.chatRoomsService.getAllChatRooms(sessionId);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ChatRoom> {
    // URL 파라미터는 기본적으로 string이므로, number 타입으로 변환 (NestJS가 자동으로 처리하기도 합니다)
    return this.chatRoomsService.getChatRoomById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 삭제 성공 시 204 No Content 반환
  remove(
    @Param('id') id: number,
  ): Promise<{ deleted: boolean; message: string }> {
    return this.chatRoomsService.deleteChatRoom(id);
  }
}
