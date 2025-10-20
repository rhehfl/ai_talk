import { ChatService } from '@/chat/chat.service';
import { ChatRoomsService } from '@/chat_rooms/chat_rooms.service';
import { GeminiService } from '@/gemini/gemini.service';
import { PersonasService } from '@/personas/personas.service';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Message } from 'common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ transports: ['websocket'] })
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly chatService: ChatService,
    private readonly geminiService: GeminiService,
    private readonly chatRoomsService: ChatRoomsService,
  ) {}
  private extractTokenFromCookie(
    cookieHeader: string | undefined,
  ): string | null {
    if (!cookieHeader) return null;
    const cookies = cookieHeader.split(';').map((c) => c.trim());
    const tokenCookie = cookies.find((c) => c.startsWith('chat_session_id='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  }
  async handleConnection(@ConnectedSocket() socket: Socket) {
    const cookieHeader = socket.handshake.headers.cookie;
    const roomId = socket.handshake.query.roomId;
    const sessionId = this.extractTokenFromCookie(cookieHeader);
    if (!sessionId) {
      socket.disconnect();
      return;
    }
    if (!roomId) {
      socket.disconnect();
      return;
    }
    socket.join(`room_${roomId}`);
    const data = await this.chatRoomsService.getChatRoomById(
      Number(roomId),
      sessionId,
    );
    await this.chatService.setSystemInstruction(
      Number(roomId),
      data.persona.prompt,
    );
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: Message,
  ) {
    const cookieHeader = socket.handshake.headers.cookie;
    const roomId = socket.handshake.query.roomId as string;

    await this.chatService.saveChatMessage(Number(roomId), payload);

    const recentHistory = await this.chatService.getChatHistory(Number(roomId));
    const systemInstruction = await this.chatService.getSystemInstruction(
      Number(roomId),
    );
    if (!systemInstruction) return '';
    const aiResponseText = await this.geminiService.generateContent(
      recentHistory.reverse(),
      systemInstruction,
    );
    const aiMessage: Message = {
      author: 'Gemini',
      content: aiResponseText,
    };
    await this.chatService.saveChatMessage(Number(roomId), aiMessage);

    this.server.to(`room_${roomId}`).emit('message', aiMessage);
  }
}
