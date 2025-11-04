import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Scope, // [수정] Scope import
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserIdentityDto } from './dto/user-identity.dto';
import { CookieService } from '@/common/cookie/cookie.service';
import { ConfigService } from '@nestjs/config';

declare global {
  namespace Express {
    interface User extends UserIdentityDto {}
  }
}

@Injectable({ scope: Scope.REQUEST })
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly cookieService: CookieService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = this.cookieService.get('authToken');

    if (token) {
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get<string>('JWT_SECRET'),
        });

        request.user = {
          id: payload.sub,
          nickname: payload.nickname,
          isAuthenticated: true,
        };

        return true;
      } catch (error) {
        console.warn('Invalid JWT token, checking for session...');
      }
    }

    const sessionId = this.cookieService.get('chat_session_id');

    if (sessionId) {
      request.user = { id: sessionId, nickname: '', isAuthenticated: false };
      return true;
    }

    throw new UnauthorizedException(
      'Missing credentials. Please log in or refresh the session.',
    );
  }
}
