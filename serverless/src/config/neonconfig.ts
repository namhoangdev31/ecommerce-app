import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import * as process from 'process';
config({ path: '.env' });

export const dataSource = new DataSource({
  type: 'mongodb',
  url: process.env.DB_URL,
  entities: ['src/entity/*.entity.ts'], // migration:generate用 entity -> migrationファイルの生成
  migrations: ['src/migration/*.ts'], // migration:run用 migrationファイル -> Neonに反映
});
