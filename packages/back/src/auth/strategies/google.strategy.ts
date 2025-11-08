import { AuthService } from '@/auth/auth.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID') || '',
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET') || '',
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL') || '',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { id, displayName, emails, photos } = profile;
    const provider = 'google';
    const providerId = id;
    const email = emails?.[0]?.value ?? '';
    const nickname = displayName;
    const profileUrl = photos?.[0]?.value ?? '';

    try {
      const user = await this.authService.validateSocialUser({
        provider,
        providerId,
        email,
        nickname,
        profileUrl,
      });

      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}
