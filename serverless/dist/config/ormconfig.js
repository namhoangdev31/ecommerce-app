"use strict";
const ormConfig = {
    type: process.env.DB_TYPE || 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    migrationsTransactionMode: 'each',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    logging: true,
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    migrationsTableName: 'migrations',
    cli: {},
};
module.exports = ormConfig;
//# sourceMappingURL=ormconfig.js.map