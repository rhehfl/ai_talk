// src/chat/chat.controller.ts

import { Controller, Get, Query } from '@nestjs/common';
import { GetChatHistoryQueryDto } from '@/chat/dto/get-chat-history.dto/get-chat-history.dto';
import { ChatService } from '@/chat/chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('history')
  async getChatHistory(@Query() query: GetChatHistoryQueryDto) {
    const { roomId } = query;

    // 실제 서비스 로직 호출
    const history = await this.chatService.getChatHistory(Number(roomId));

    return history;
  }
}
