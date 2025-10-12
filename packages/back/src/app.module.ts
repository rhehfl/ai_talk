import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './core/redis/redis.module';
import { SessionModule } from './session/session.module';
import { PersonasModule } from './personas/personas.module';

@Module({
  imports: [RedisModule, SessionModule, PersonasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
