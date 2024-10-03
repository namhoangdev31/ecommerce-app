import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { ThrottlerModuleOptions } from '@nestjs/throttler';

const throttleConfig: ThrottlerModuleOptions = {
  ttl: parseInt(process.env.THROTTLE_GLOBAL_TTL || '60', 10),
  limit: parseInt(process.env.THROTTLE_GLOBAL_LIMIT || '60', 10),
  storage: new ThrottlerStorageRedisService({
    host: process.env.QUEUE_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    // password: process.env.REDIS_PASSWORD
  }),
};

export = throttleConfig;
