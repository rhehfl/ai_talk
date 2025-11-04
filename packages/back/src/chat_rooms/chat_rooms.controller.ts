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
import { CookieService } from '@/common/cookie/cookie.service';

@Controller('chatrooms')
export class ChatRoomsController {
  constructor(
    private readonly chatRoomsService: ChatRoomsService,
    private readonly cookieService: CookieService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createDto: CreateChatRoomDto,
    @Req() req: Request,
  ): Promise<ChatRoom> {
    const sessionId = this.cookieService.get('chat_session_id');
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
  findOne(@Req() req: Request, @Param('id') id: number): Promise<ChatRoom> {
    const sessionId = req.cookies['chat_session_id'];
    if (!sessionId) {
      throw new UnauthorizedException(
        'Missing chat_session_id cookie. Please log in.',
      );
    }
    return this.chatRoomsService.getChatRoomById(id, sessionId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id') id: number,
  ): Promise<{ deleted: boolean; message: string }> {
    return this.chatRoomsService.deleteChatRoom(id);
  }
}
