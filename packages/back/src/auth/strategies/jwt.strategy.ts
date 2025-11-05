// src/auth/strategies/jwt.strategy.ts
import { UserIdentityDto } from '@/auth/dto/user-identity.dto';
import { UserService } from '@/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || '',
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async validate(payload: any): Promise<UserIdentityDto> {
    const user = await this.userService.findOneById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    return { id: user.id, nickname: user.nickname, isAuthenticated: true };
  }
}
