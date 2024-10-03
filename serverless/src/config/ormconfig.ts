import { ConnectionOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { UserEntity } from '../auth/entity/user.entity';
import { RefreshToken } from '../refresh-token/entities/refresh-token.entity';
import { EmailTemplateEntity } from '../email-template/entities/email-template.entity';
import { PermissionEntity } from '../permission/entities/permission.entity';
import { RoleEntity } from '../role/entities/role.entity';
import { UserRepository } from '../auth/user.repository';

dotenvConfig({ path: '../.env' });

const ormConfig: ConnectionOptions = {
  type: (process.env.DB_TYPE as any) || 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrationsTransactionMode: 'each',
  entities: [
    UserEntity,
    RefreshToken,
    EmailTemplateEntity,
    PermissionEntity,
    RoleEntity,
    UserRepository,
  ],
  logging: true,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  // migrationsRun: process.env.NODE_ENV === 'test',
  // dropSchema: process.env.NODE_ENV === 'test',
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export = ormConfig;
