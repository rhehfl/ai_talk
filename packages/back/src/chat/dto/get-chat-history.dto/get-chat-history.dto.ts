import { IsNumberString } from 'class-validator';

export class GetChatHistoryQueryDto {
  @IsNumberString()
  roomId: string;
}
