import { SessionService } from '@/session/session.service';
import { Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  createSession(@Res({ passthrough: true }) res: Response) {
    const sessionId = this.sessionService.create();
    res.cookie('chat_session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24,
    });
    return { sessionId };
  }
}
