import { SocialLoginDto } from '@/auth/dto/social-login.dto';
import { UserIdentityDto } from '@/auth/dto/user-identity.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';
import { AuthService } from '@/auth/auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get('GITHUB_CLIENT_ID') || '',
      clientSecret: configService.get('GITHUB_CLIENT_SECRET') || '',
      callbackURL: configService.get('GITHUB_CALLBACK_URL') || '',
      scope: ['read:user', 'repo'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ) {
    const { id, username, photos, emails } = profile;
    const email = emails && emails.length > 0 ? emails[0].value : '';

    const userPayload: SocialLoginDto = {
      provider: 'github',
      providerId: id,
      email,
      nickname: username || '',
      profileUrl: photos?.[0]?.value || '',
      accessToken,
    };
    this.authService.validateSocialUser(userPayload);

    done(null, userPayload);
  }
}
