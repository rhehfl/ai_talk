import { ChatGateway } from '@/chat/chat.gateway';
import { ChatService } from '@/chat/chat.service';
import { ChatRoomsModule } from '@/chat_rooms/chat_rooms.module';
import { GeminiModule } from '@/gemini/gemini.module';
import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { AuthModule } from '@/auth/auth.module';
import { Chat } from '@/chat/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat]),
    AuthModule,
    GeminiModule,
    ChatRoomsModule,
  ],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
