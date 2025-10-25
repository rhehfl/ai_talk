// GetChatHistoryQueryDto (예시)

import { IsNumberString, IsOptional } from 'class-validator';

export class GetChatHistoryQueryDto {
  @IsNumberString()
  roomId: string;
}
