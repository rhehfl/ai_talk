import { Module } from '@nestjs/common';
import { ChatRoomsService } from '@/chat_rooms/chat_rooms.service';
import { ChatRoomsController } from '@/chat_rooms/chat_rooms.controller';
import { ChatRoomRepository } from '@/chat_rooms/chat_rooms.repository';

@Module({
  controllers: [ChatRoomsController],
  providers: [ChatRoomsService, ChatRoomRepository],
  exports: [ChatRoomRepository],
})
export class ChatRoomsModule {}
