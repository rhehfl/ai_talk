import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import type { Request, Response, CookieOptions } from 'express';

@Injectable()
export class CookieService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  set(
    res: Response,
    key: string,
    value: string,
    options?: CookieOptions,
  ): void {
    const mergedOptions = { ...this.getDefaultOptions(), ...options };
    res.cookie(key, value, mergedOptions);
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

  clear(res: Response, key: string, options?: CookieOptions): void {
    const mergedOptions = { ...this.getDefaultOptions(), ...options };

    res.clearCookie(key, mergedOptions);
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
