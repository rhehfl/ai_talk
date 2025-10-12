import { SessionController } from '@/session/session.controller';
import { SessionService } from '@/session/session.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
