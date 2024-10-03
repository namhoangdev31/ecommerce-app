"use strict";
const nestjs_throttler_storage_redis_1 = require("nestjs-throttler-storage-redis");
const throttleConfig = {
    ttl: parseInt(process.env.THROTTLE_GLOBAL_TTL || '60', 10),
    limit: parseInt(process.env.THROTTLE_GLOBAL_LIMIT || '60', 10),
    storage: new nestjs_throttler_storage_redis_1.ThrottlerStorageRedisService({
        host: process.env.QUEUE_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
    }),
};
module.exports = throttleConfig;
//# sourceMappingURL=throttle-config.js.map