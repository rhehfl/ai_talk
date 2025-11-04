import { UserIdentityDto } from '@/auth/dto/user-identity.dto';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserIdentityDto => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) {
      throw new Error(
        'User decorator used without AuthGuard. Make sure AuthGuard is applied.',
      );
    }
    return request.user;
  },
);
