// chat/chat.module.ts에 ChatGateway가 포함되어 있어야 합니다.

// chat/chat.gateway.ts
import { ChatRoomsService } from '@/chat_rooms/chat_rooms.service';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { IncomingMessage } from 'http';
import { Socket } from 'socket.io';

@WebSocketGateway({
  namespace: '/chat', // /chat 네임스페이스로 접속
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatRoomService: ChatRoomsService,
    // private readonly geminiService: GeminiService, // AI 연결 서비스
  ) {}
  parseCookies(cookieHeader: string | undefined): Record<string, string> {
    if (!cookieHeader) return {};
    return cookieHeader.split(';').reduce(
      (acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        if (key && value) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, string>,
    );
  }
  // 1. 유저 연결 처리 (핸드셰이크 단계)
  async handleConnection(
    @ConnectedSocket() client: Socket,
    request: IncomingMessage,
  ) {
    // [1] 인증 토큰 추출 및 userId 확인 (예: 쿼리에서 토큰 추출 후 검증)
    const cookies = this.parseCookies(request.headers.cookie);
    const sessionId = cookies['chat_session_id'];
    if (!sessionId) {
      client.close(1008, 'Unauthorized: Missing session ID');
      return;
    }

    const roomIdQuery = WebSocket.handshake.query.roomId as string;
    const roomId = parseInt(roomIdQuery, 10);

    // [3] ChatRoom 유효성 검사 및 페르소나 ID 확보
    const chatRoom = await this.chatRoomService.getChatRoomById(
      roomId,
      sessionId,
    );

    if (!chatRoom) {
      client.close(1008, 'Unauthorized or Room Not Found');
      return;
    }

    // [4] 유효한 연결: 유저 정보와 페르소나 ID를 소켓에 저장
    // client['roomId'] = roomId;
    // client['personaId'] = chatRoom.personaId;
    // client['geminiStream'] = this.geminiService.createChatStream(chatRoom.personaId); // Gemini API 스트림 생성

    console.log(
      `User ${userId} connected to Room ${roomId} with Persona ${chatRoom.personaId}`,
    );
  }

  // 2. 채팅 메시지 수신 및 Gemini 응답
  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() client: WebSocket,
    @MessageBody() payload: { content: string },
  ) {
    // 챗봇과의 대화이므로, 유저 메시지를 받은 후 바로 AI 응답을 스트리밍합니다.

    // [1] 유효성 검증 (client에 저장된 roomId, personaId 확인)
    const personaId = client['personaId'];
    const geminiStream = client['geminiStream']; // 이미 생성된 스트림/세션 사용

    if (!personaId || !geminiStream) {
      client.send(JSON.stringify({ error: 'Session not initialized.' }));
      return;
    }

    // [2] Gemini API 호출 및 응답 스트리밍
    // 현재는 Redis 저장이 없으므로, AI 응답을 받자마자 클라이언트에 보냅니다.
    const userMessage = payload.content;

    const responseStream = await geminiStream.sendMessage(userMessage);

    for await (const chunk of responseStream) {
      // [3] Gemini 응답을 클라이언트에게 실시간 스트리밍
      client.send(
        JSON.stringify({
          sender: 'persona',
          content: chunk.text,
        }),
      );
      // 이 시점에 RDB에 메시지 저장 (비동기 처리 권장)
      // await this.chatService.saveMessage(roomId, 'persona', chunk.text);
    }
  }

  // 3. 연결 해제 처리
  handleDisconnect(@ConnectedSocket() client: WebSocket) {
    // 연결이 끊어지면 소켓에 저장했던 세션 정보(Gemini 스트림 등)를 정리합니다.
  }
}
