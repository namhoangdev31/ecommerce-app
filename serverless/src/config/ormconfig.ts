import { DataSourceOptions } from 'typeorm';

const ormConfig: DataSourceOptions = {
  type: 'mongodb',
  url: process.env.DB_URL,
  migrationsTransactionMode: 'each',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  logging: false,
  synchronize: false,
  migrationsRun: process.env.NODE_ENV === 'test',
  dropSchema: process.env.NODE_ENV === 'test',
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
};

export = ormConfig;
