import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import * as config from 'config';

const throttleConfigVariables = config.get('throttle.global');
const redisConfig = config.get('queue');
const throttleConfig: ThrottlerModuleOptions = {
  ttl: process.env.THROTTLE_GLOBAL_TTL || throttleConfigVariables.get('ttl'),
  limit:
    process.env.THROTTLE_GLOBAL_LIMIT || throttleConfigVariables.get('limit'),
  storage: new ThrottlerStorageRedisService({
    host: process.env.QUEUE_HOST || redisConfig.host,
    port: process.env.REDIS_PORT || redisConfig.port,
    // password: process.env.REDIS_PASSWORD || redisConfig.password
  }),
};

export = throttleConfig;
