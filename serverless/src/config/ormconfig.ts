import { DataSourceOptions } from 'typeorm';
import process from 'process';

const ormConfig: DataSourceOptions = {
  type: 'mongodb',
  url: process.env.DB_URL,
  migrationsTransactionMode: 'each',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  logging: false,
  synchronize: false,
  database: process.env.DB_NAME,
  // migrationsRun: process.env.NODE_ENV === 'test',
  dropSchema: process.env.NODE_ENV === 'development',
  migrationsTableName: 'migrations',
  cache: true,
  // migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
};

export = ormConfig;
