import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserIdentityDto } from '@/auth/dto/user-identity.dto';
import { UserService } from '@/user/user.service';
import { SocialLoginDto } from '@/auth/dto/social-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateSocialUser(dto: SocialLoginDto): Promise<UserIdentityDto> {
    const user = await this.userService.findOrCreateSocialUser(dto);

    return {
      id: user.id,
      nickname: user.nickname,
      isAuthenticated: true,
    };
  }

  async login(user: UserIdentityDto) {
    const payload = { nickname: user.nickname, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
