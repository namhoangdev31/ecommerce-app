import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { ThrottlerModuleOptions } from '@nestjs/throttler';

const throttleConfig: ThrottlerModuleOptions = {
  throttlers: [
    {
      ttl: parseInt(process.env.THROTTLE_TTL),
      limit: parseInt(process.env.THROTTLE_LIMIT),
    },
  ],
  storage: new ThrottlerStorageRedisService({
    host: process.env.QUEUE_HOST,
    port: parseInt(process.env.QUEUE_PORT),
    password: process.env.QUEUE_PASSWORD,
  }),
};

export = throttleConfig;
