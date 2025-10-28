// src/auth/strategies/jwt.strategy.ts
import { User } from '@/user/entities/user.entity';
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

  /**
   * 토큰이 유효하면(비밀 키 일치, 만료 시간 안 지남) 이 함수가 호출됩니다.
   * payload에는 AuthService에서 login()할 때 넣었던 정보가 담겨있습니다.
   */
  async validate(payload: any): Promise<User> {
    // payload = { nickname: '...', sub: '유저UUID' }

    // 4. payload의 ID(sub)를 이용해 실제 유저가 DB에 있는지 확인
    const user = await this.userService.findOneById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    // 5. 여기서 반환된 user 객체는 컨트롤러의 req.user에 담깁니다.
    return user;
  }
}
