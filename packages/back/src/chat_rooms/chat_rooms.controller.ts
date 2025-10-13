import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Req,
  UnauthorizedException,
  Body,
} from '@nestjs/common';
import type { Request } from 'express';
import { ChatRoomsService } from '@/chat_rooms/chat_rooms.service';
import { CreateChatRoomDto } from '@/chat_rooms/dto/create-chat-room.dto';

@Controller('chat-rooms')
export class ChatRoomsController {
  constructor(private readonly chatRoomsService: ChatRoomsService) {}

  @Post(':personaId')
  createChatRoom(
    @Req() req: Request,
    @Body() createChatRoomDto: CreateChatRoomDto,
  ) {
    const sessionId = req.cookies['chat_session_id'];
    if (!sessionId) {
      throw new UnauthorizedException('세션 ID가 없습니다.');
    }

    return this.chatRoomsService.createChatRoom(
      sessionId,
      createChatRoomDto.personaId,
    );
  }

  @Delete(':roomId')
  deleteChatRoom(@Param('roomId') roomId: string) {
    return this.chatRoomsService.deleteChatRoom(roomId);
  }

  @Get()
  getMyChatRooms() {
    return this.chatRoomsService.getMyChatRooms();
  }
}
