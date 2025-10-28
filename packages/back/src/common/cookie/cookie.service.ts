import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import type { Request, Response, CookieOptions } from 'express';

@Injectable()
export class CookieService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @Inject('RESPONSE') private readonly response: Response,
  ) {}

  set(key: string, value: string, options?: CookieOptions): void {
    const mergedOptions = { ...this.getDefaultOptions(), ...options };
    this.response.cookie(key, value, mergedOptions);
  }

  get(key: string): string | undefined {
    if (this.request.cookies && this.request.cookies[key]) {
      return this.request.cookies[key];
    }
    if (this.request.signedCookies && this.request.signedCookies[key]) {
      return this.request.signedCookies[key];
    }
    return undefined;
  }

  clear(key: string, options?: CookieOptions): void {
    const mergedOptions = { ...this.getDefaultOptions(), ...options };
    // 쿠키를 삭제하려면 'expires'를 과거로 설정하거나 'maxAge: 0'을 사용합니다.
    // express의 clearCookie는 이 작업을 자동으로 해줍니다.
    this.response.clearCookie(key, mergedOptions);
  }

  private getDefaultOptions(): CookieOptions {
    const isProduction = process.env.NODE_ENV === 'production';

    const cookieOptions = {
      httpOnly: true,
      path: '/',
      sameSite: 'none' as const,
      secure: true,
    };
    if (isProduction) {
      Object.assign(cookieOptions, { domain: '.doran-doran.cloud' });
      Object.assign(cookieOptions, { sameSite: 'strict' });
    }

    return cookieOptions;
  }
}
