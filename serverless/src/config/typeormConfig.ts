import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import * as process from 'process';
config({ path: '.env' });

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.DB_URL,
  synchronize: true,
  autoLoadEntities: true,
};
