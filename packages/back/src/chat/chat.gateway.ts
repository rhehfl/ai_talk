import { ChatService } from '@/chat/chat.service';
import { GeminiService } from '@/gemini/gemini.service';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Message } from 'common';
import { Socket } from 'socket.io';

@WebSocketGateway({ transports: ['websocket'] })
export class ChatGateway {
  constructor(
    private readonly chatService: ChatService,
    private readonly geminiService: GeminiService,
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
    console.log(sessionId, roomId);
    socket.join(`room_${roomId}`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: Message,
  ): Promise<string> {
    const cookieHeader = socket.handshake.headers.cookie;
    const sessionId = this.extractTokenFromCookie(cookieHeader);
    const roomId = socket.handshake.query.roomId as string;
    const userMessage = payload.content;
    console.log('Received:', payload);
    await this.chatService.saveChatMessage(Number(roomId), payload);
    const recentHistory = await this.chatService.getChatHistory(Number(roomId));
    const aiResponseText = await this.geminiService.generateContent(
      recentHistory,
      systemInstruction,
    );
    return 'Hello world!';
  }
}
