import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserIdentityDto } from '@/auth/dto/user-identity.dto';
import { UserService } from '@/user/user.service';
import { SocialLoginDto } from '@/auth/dto/social-login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async validateSocialUser(dto: SocialLoginDto): Promise<UserIdentityDto> {
    const user = await this.userService.findOrCreateSocialUser(dto);

    return {
      id: user.id,
      isAuthenticated: true,
    };
  }

  async getUserIdentityFromHeader(
    cookieHeader: string | undefined,
  ): Promise<UserIdentityDto> {
    // 1순위: JWT 토큰 (authToken)
    const token = this.extractCookie(cookieHeader, 'authToken');
    if (token) {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      console.log(payload);
      return {
        id: payload.sub,
        isAuthenticated: true,
      };
    }

    // 2순위: 익명 세션 (chat_session_id)
    const sessionId = this.extractCookie(cookieHeader, 'chat_session_id');
    if (sessionId) {
      return {
        id: sessionId,
        isAuthenticated: false,
      };
    }

    // 3순위: 둘 다 없으면 에러
    throw new UnauthorizedException('Missing credentials.');
  }

  async login(user: UserIdentityDto) {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private extractCookie(
    cookieHeader: string | undefined,
    cookieName: string,
  ): string | null {
    if (!cookieHeader) return null;
    const cookies = cookieHeader.split(';').map((c) => c.trim());
    const tokenCookie = cookies.find((c) => c.startsWith(`${cookieName}=`));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  }
}
