import { SessionService } from '@/session/session.service';
import { Controller, Post, Req, Res } from '@nestjs/common';
import type { Response, Request } from 'express';

const isProduction = process.env.NODE_ENV === 'production';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  createSession(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const sessionId = req.cookies['chat_session_id'];
    const newSessionId = this.sessionService.create(sessionId);
    const cookieOptions = {
      httpOnly: true,
      path: '/',
      sameSite: 'none' as const,
      secure: true,
    };
    if (isProduction) {
      Object.assign(cookieOptions, { domain: '.doran-doran.cloud' });
    }

    res.cookie('chat_session_id', newSessionId, cookieOptions);
    return { sessionId: newSessionId };
  }
}
