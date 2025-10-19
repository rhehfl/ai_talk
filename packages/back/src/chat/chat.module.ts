import { ChatGateway } from '@/chat/chat.gateway';
import { ChatService } from '@/chat/chat.service';
import { GeminiModule } from '@/gemini/gemini.module';
import { Module } from '@nestjs/common';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [GeminiModule],
})
export class ChatModule {}
