"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
var dotenv_1 = require("dotenv");
var process = require("process");
(0, dotenv_1.config)({ path: '.env' });
exports.typeOrmConfig = {
    type: 'mongodb',
    url: process.env.DB_URL,
    synchronize: true,
    autoLoadEntities: true,
};
//# sourceMappingURL=typeormConfig.js.map