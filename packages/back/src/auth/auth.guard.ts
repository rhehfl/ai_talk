import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Scope,
} from '@nestjs/common';
import { Request } from 'express';
import { UserIdentityDto } from './dto/user-identity.dto';

import { AuthService } from '@/auth/auth.service';

declare global {
  namespace Express {
    interface User extends UserIdentityDto {}
  }
}

@Injectable({ scope: Scope.REQUEST })
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    try {
      const cookieHeader = request.headers.cookie;

      const userDto =
        await this.authService.getUserIdentityFromHeader(cookieHeader);

      request.user = userDto;
      return true;
    } catch (error) {
      throw error;
    }
  }
}
