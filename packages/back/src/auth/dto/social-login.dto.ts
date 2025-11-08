import { AuthProvider } from '@/user/types/auth-provider.enum';

export class SocialLoginDto {
  provider: AuthProvider;
  email: string;
  nickname: string;
  providerId: string;
  profileUrl: string;
}
