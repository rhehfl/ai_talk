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
    try {
      const data = await this.chatRoomsService.getChatRoomById(
        Number(roomId),
        sessionId,
      );
      await this.chatService.setSystemInstruction(
        Number(roomId),
        data.persona.prompt,
      );
    } catch (error) {
      const statusCode = error.status || 500;
      console.error(
        `[Connection Error] roomId: ${roomId}, sessionId: ${sessionId}`,
        error.message,
      );
      socket.emit('error', {
        message: '채팅방을 찾을 수 없거나 접근 권한이 없습니다.',
        code: statusCode,
      });

      socket.disconnect();
    }

    socket.join(`room_${roomId}`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: Message,
  ) {
    const roomId = socket.handshake.query.roomId as string;

    await this.chatService.saveChatMessage(Number(roomId), payload);
    const recentHistory = await this.chatService.getChatHistory(Number(roomId));
    const systemInstruction = await this.chatService.getSystemInstruction(
      Number(roomId),
    );
    if (!systemInstruction) return '';

    const aiResponseText = await this.geminiService.generateStreamContent(
      recentHistory,
      systemInstruction,
      this.server,
      payload.content,
    );
    const aiMessage: Message = {
      author: 'Gemini',
      content: aiResponseText,
    };
    await this.chatService.saveChatMessage(Number(roomId), aiMessage);

    // this.server.to(`room_${roomId}`).emit('message', aiMessage);
  }
}
