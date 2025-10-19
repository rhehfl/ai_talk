import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway(80, { transports: ['websocket'] })
export class ChatGateway {
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string): string {
    return 'Hello world!';
  }
}
