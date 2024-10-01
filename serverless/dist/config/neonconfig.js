"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
var dotenv_1 = require("dotenv");
var typeorm_1 = require("typeorm");
var process = require("process");
(0, dotenv_1.config)({ path: '.env' });
exports.dataSource = new typeorm_1.DataSource({
    type: 'mongodb',
    url: process.env.DB_URL,
    entities: ['src/entity/*.entity.ts'],
    migrations: ['src/migration/*.ts'],
});
//# sourceMappingURL=neonconfig.js.map