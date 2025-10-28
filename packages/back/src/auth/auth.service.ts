import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service'; // 1. UserService 임포트
import { JwtService } from '@nestjs/jwt';
import { AuthProvider, User } from '@/user/entities/user.entity';

interface SocialLoginDto {
  provider: AuthProvider;
  providerId: string;
  email: string;
  nickname: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateSocialUser(dto: SocialLoginDto): Promise<User> {
    return this.userService.findOrCreateSocialUser(dto);
  }

  async login(user: User) {
    const payload = { nickname: user.nickname, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
