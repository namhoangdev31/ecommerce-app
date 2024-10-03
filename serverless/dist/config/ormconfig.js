"use strict";
const dotenv_1 = require("dotenv");
const user_entity_1 = require("../auth/entity/user.entity");
const refresh_token_entity_1 = require("../refresh-token/entities/refresh-token.entity");
const email_template_entity_1 = require("../email-template/entities/email-template.entity");
const permission_entity_1 = require("../permission/entities/permission.entity");
const role_entity_1 = require("../role/entities/role.entity");
const user_repository_1 = require("../auth/user.repository");
(0, dotenv_1.config)({ path: '../.env' });
const ormConfig = {
    type: process.env.DB_TYPE || 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    migrationsTransactionMode: 'each',
    entities: [
        user_entity_1.UserEntity,
        refresh_token_entity_1.RefreshToken,
        email_template_entity_1.EmailTemplateEntity,
        permission_entity_1.PermissionEntity,
        role_entity_1.RoleEntity,
        user_repository_1.UserRepository,
    ],
    logging: true,
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    migrationsTableName: 'migrations',
    migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/database/migrations',
    },
};
module.exports = ormConfig;
//# sourceMappingURL=ormconfig.js.map