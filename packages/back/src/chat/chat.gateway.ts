import { AuthService } from '@/auth/auth.service';
import { UserIdentityDto } from '@/auth/dto/user-identity.dto';
import { ChatService } from '@/chat/chat.service';
import { ChatRoomsService } from '@/chat_rooms/chat_rooms.service';
import { GeminiService } from '@/gemini/gemini.service';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Message } from 'common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  transports: ['websocket'],
  cors: {
    origin: [
      'https://localhost:3000',
      'https://doran-doran.cloud',
      'https://www.doran-doran.cloud',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly chatService: ChatService,
    private readonly geminiService: GeminiService,
    private readonly chatRoomsService: ChatRoomsService,
    private readonly authService: AuthService,
  ) {}

  async handleConnection(@ConnectedSocket() socket: Socket) {
    const cookieHeader = socket.handshake.headers.cookie;
    const roomId = socket.handshake.query.roomId;
    let userDto: UserIdentityDto;

    try {
      userDto = await this.authService.getUserIdentityFromHeader(cookieHeader);
    } catch (error) {
      console.error('[WS Connection Error] Auth failed:', error.message);
      socket.emit('error', { message: '인증 실패' });
      socket.disconnect();
      return;
    }

    if (!roomId) {
      socket.emit('error', { message: '방 ID가 없습니다.' });
      socket.disconnect();
      return;
    }

    try {
      const data = await this.chatRoomsService.getChatRoomById(
        Number(roomId),
        userDto.id,
      );
      socket.data.roomId = roomId;
      socket.data.personaId = data.persona.id;

      await this.chatService.setSystemInstruction(
        Number(roomId),
        data.persona.prompt,
      );
    } catch (error) {
      socket.emit('error', {
        message: '채팅방을 찾을 수 없거나 접근 권한이 없습니다.',
        code: error.status || 500,
      });
      socket.disconnect();
      return;
    }

    socket.data.user = userDto;

    socket.join(`room_${roomId}`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: Message,
  ) {
    const roomId = socket.handshake.query.roomId as string;
    const roomName = `room_${roomId}`;

    await this.chatService.saveChatMessage(
      Number(roomId),
      payload,
      socket.data.user.id,
      socket.data.personaId,
    );
    const recentHistory = await this.chatService.getChatHistory(Number(roomId));
    const systemInstruction = await this.chatService.getSystemInstruction(
      Number(roomId),
    );
    if (!systemInstruction) return '';

    const aiResponseText = await this.geminiService.generateStreamContent(
      recentHistory,
      systemInstruction,
      this.server.to(roomName),
      payload.content,
    );
    const aiMessage: Message = {
      author: 'Gemini',
      content: aiResponseText,
    };
    await this.chatService.saveChatMessage(
      Number(roomId),
      aiMessage,
      socket.data.user.id,
      socket.data.personaId,
    );
  }
}
