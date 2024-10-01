import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import * as process from 'process';
config({ path: '.env' });

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.DB_URL,
  synchronize: true, // 監視してたら保存した時にスキーマ更新走るっぽい？ 開発環境下のみtrueにしておく
  autoLoadEntities: true, // entitesへの追加が自動化される
};
