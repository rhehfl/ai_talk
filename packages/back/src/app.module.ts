import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './core/redis/redis.module';
import { SessionModule } from './session/session.module';
import { PersonasModule } from './personas/personas.module';
import { ChatRoomsModule } from './chat_rooms/chat_rooms.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `src/configs/env/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeORMConfig),
    RedisModule,
    SessionModule,
    PersonasModule,
    ChatRoomsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
