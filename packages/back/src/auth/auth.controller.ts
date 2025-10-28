import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CookieOptions, Response } from 'express';
import { User } from '@/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLoginStart() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req, @Res() res: Response) {
    const user = req.user as User;

    const nodeEnv = this.configService.get<string>('NODE_ENV');
    const jwtToken = await this.authService.login(user);
    const token = jwtToken.access_token;
    const isDevelopment = nodeEnv === 'development' || nodeEnv === 'dev';
    const cookieOptions = {
      httpOnly: true,
      path: '/',
      sameSite: 'none' as const,
      secure: true,
    };
    if (!isDevelopment) {
      Object.assign(cookieOptions, { domain: '.doran-doran.cloud' });
    }

    res.cookie('authToken', token, cookieOptions);

    let redirectUrl = '';
    if (isDevelopment) {
      redirectUrl = `https://localhost:3000/auth/callback`;
    } else {
      redirectUrl = `https://www.doran-doran.cloud/auth/callback`;
    }

    res.redirect(redirectUrl);
  }
}
