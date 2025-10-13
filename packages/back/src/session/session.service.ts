import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class SessionService {
  create() {
    return crypto.randomBytes(16).toString('hex');
  }
}
