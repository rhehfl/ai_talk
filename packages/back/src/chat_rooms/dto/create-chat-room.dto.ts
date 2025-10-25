import { IsString, IsNumber } from 'class-validator';

export class CreateChatRoomDto {
  @IsString()
  userId: string;

  @IsNumber()
  personaId: number;
}
