import { ChatGateway } from '@/chat/chat.gateway';
import { ChatService } from '@/chat/chat.service';
import { ChatRoomsModule } from '@/chat_rooms/chat_rooms.module';
import { GeminiModule } from '@/gemini/gemini.module';
import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [GeminiModule, ChatRoomsModule],
  controllers: [ChatController],
})
export class ChatModule {}
