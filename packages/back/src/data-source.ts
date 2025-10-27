import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

config({
  path: './configs/env/.dev.env',
});

const configService = new ConfigService();
const isProduction = process.env.NODE_ENV === 'production';
const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  database: configService.get('DATABASE_NAME'),
  host: configService.get('DATABASE_HOST'),
  port: parseInt(configService.get('DATABASE_PORT') || '5432', 10),
  username: configService.get('DATABASE_USER'),
  password: configService.get<string>('DATABASE_PASSWORD') as string,
  synchronize: configService.get('NODE_ENV') === 'dev',
  seeds: [
    isProduction ? 'dist/database/seeds/**/*.js' : 'database/seeds/**/*.ts',
  ],
  seedTracking: false,
  entities: [isProduction ? 'dist/src/**/*.entity.js' : 'src/**/*.entity.ts'],
  migrations: [
    isProduction ? 'dist/src/migrations/*.js' : 'src/migrations/*.ts',
  ],
};

const dataSource = new DataSource(options);
export default dataSource;
