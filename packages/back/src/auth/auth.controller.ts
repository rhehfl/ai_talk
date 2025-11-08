import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { CookieService } from '@/common/cookie/cookie.service';
import { UserIdentityDto } from '@/auth/dto/user-identity.dto';
import { AuthGuard as JWTAuthGuard } from '@/auth/auth.guard';
import { User } from '@/auth/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly cookieService: CookieService,
  ) {}
  @Get('me')
  @UseGuards(JWTAuthGuard)
  async getMe(@User() user: UserIdentityDto) {
    if (user) {
      return {
        nickname: user.nickname,
        isAuthenticated: user.isAuthenticated,
      };
    } else {
      return null;
    }
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLoginStart() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req, @Res() res: Response) {
    const user = req.user as UserIdentityDto;

    const nodeEnv = this.configService.get<string>('NODE_ENV');
    const jwtToken = await this.authService.login(user);
    const token = jwtToken.access_token;

    const isDevelopment = nodeEnv === 'dev';

    let redirectUrl = '';
    if (isDevelopment) {
      redirectUrl = `https://localhost:3000/auth/callback`;
    } else {
      redirectUrl = `https://www.doran-doran.cloud/auth/callback`;
    }

    this.cookieService.set(res, 'authToken', token);
    res.redirect(redirectUrl);
  }
}
