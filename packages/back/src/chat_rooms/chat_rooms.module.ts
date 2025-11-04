import { Module } from '@nestjs/common';
import { ChatRoomsService } from '@/chat_rooms/chat_rooms.service';
import { ChatRoomsController } from '@/chat_rooms/chat_rooms.controller';
import { ChatRoomsRepository } from '@/chat_rooms/chat_rooms.repository';
import { ChatRoom } from '@/chat_rooms/chat-room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CookieModule } from '@/common/cookie/cookie.module';
import { User } from '@/user/user.entity';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatRoom, User]),
    CookieModule,
    AuthModule,
  ],
  controllers: [ChatRoomsController],
  providers: [ChatRoomsService, ChatRoomsRepository],
  exports: [ChatRoomsRepository, ChatRoomsService],
})
export class ChatRoomsModule {}
