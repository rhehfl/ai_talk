import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'path';

config({
  path: './configs/env/.dev.env',
});
const configService = new ConfigService();

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  database: configService.get('DATABASE_NAME'),
  host: configService.get('DATABASE_HOST'),
  port: parseInt(configService.get('DATABASE_PORT') || '5432', 10),
  username: configService.get('DATABASE_USER'),
  password: configService.get<string>('DATABASE_PASSWORD') as string,
  synchronize: configService.get('NODE_ENV') === 'dev',
  seeds: ['database/seeds/**{.ts,.js}'],
  seedTracking: false,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
};

export const dataSource = new DataSource(options);
