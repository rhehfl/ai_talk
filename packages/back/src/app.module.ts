import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './core/redis/redis.module';
import { SessionModule } from './session/session.module';
import { PersonasModule } from './personas/personas.module';
import { ChatRoomsModule } from './chat_rooms/chat_rooms.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./configs/env/.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        typeORMConfig(configService),
    }),
    RedisModule,
    SessionModule,
    PersonasModule,
    ChatRoomsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
