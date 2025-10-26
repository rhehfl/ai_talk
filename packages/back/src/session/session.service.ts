import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class SessionService {
  create(sessionId?: string): string {
    if (sessionId) {
      return sessionId;
    }
    return crypto.randomBytes(16).toString('hex');
  }
}
