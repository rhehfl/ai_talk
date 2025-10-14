import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: (
  configService: ConfigService,
) => TypeOrmModuleOptions = (configService) => {
  console.log(configService.get('NODE_ENV') === 'dev');
  return {
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: parseInt(configService.get('DATABASE_PORT') || '5432', 10),
    username: configService.get('DATABASE_USER'),
    password: configService.get<string>('DATABASE_PASSWORD') as string,
    database: configService.get('DATABASE_NAME'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: configService.get('NODE_ENV') === 'dev',
  };
};
