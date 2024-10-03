import { ConnectionOptions } from 'typeorm';

const ormConfig: ConnectionOptions = {
  type: (process.env.DB_TYPE as any) || 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrationsTransactionMode: 'each',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  logging: true,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  // migrationsRun: process.env.NODE_ENV === 'test',
  // dropSchema: process.env.NODE_ENV === 'test',
  migrationsTableName: 'migrations',
  // migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
  cli: {
    // migrationsDir: 'src/database/migrations',/
  },
};

export = ormConfig;
