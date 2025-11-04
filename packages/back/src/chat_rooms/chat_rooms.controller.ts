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
  UseGuards,
} from '@nestjs/common';
import { ChatRoomsService } from '@/chat_rooms/chat_rooms.service';
import { CreateChatRoomDto } from '@/chat_rooms/dto/create-chat-room.dto';
import { ChatRoom } from '@/chat_rooms/chat-room.entity';
import { Request } from 'express';
import { CookieService } from '@/common/cookie/cookie.service';
import { UserIdentityDto } from '@/auth/dto/user-identity.dto';
import { User } from '@/auth/user.decorator';
import { AuthGuard } from '@/auth/auth.guard';

@Controller('chatrooms')
@UseGuards(AuthGuard)
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
    @User() user: UserIdentityDto,
  ): Promise<ChatRoom> {
    const completeDto = {
      userId: user.id,
      personaId: createDto.personaId,
      isAuthenticated: user.isAuthenticated,
    };

    return this.chatRoomsService.createChatRoom(completeDto);
  }

  @Get()
  findAll(
    @Req() req: Request,
    @User() user: UserIdentityDto,
  ): Promise<ChatRoom[]> {
    console.log(user);
    return this.chatRoomsService.getAllChatRooms(user.id);
  }

  @Get(':id')
  findOne(
    @Req() req: Request,
    @Param('id') id: number,
    @User() user: UserIdentityDto,
  ): Promise<ChatRoom> {
    return this.chatRoomsService.getChatRoomById(id, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id') id: number,
    @User() user: UserIdentityDto,
  ): Promise<{ deleted: boolean; message: string }> {
    return this.chatRoomsService.deleteChatRoom(id, user.id);
  }
}
