import { SessionService } from '@/session/session.service';
import { Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';

const isProduction = process.env.NODE_ENV === 'production';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  createSession(@Res({ passthrough: true }) res: Response) {
    const sessionId = this.sessionService.create();
    const cookieOptions = {
      httpOnly: true,
      path: '/',
      sameSite: 'none' as const,
      secure: true,
    };
    if (isProduction) {
      Object.assign(cookieOptions, { domain: '.doran-doran.cloud' });
    }

    res.cookie('chat_session_id', sessionId, cookieOptions);
    return { sessionId };
  }
}
