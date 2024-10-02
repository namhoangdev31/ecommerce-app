import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import Redis from 'ioredis';

import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { UserRepository } from 'src/auth/user.repository';
import { UniqueValidatorPipe } from 'src/common/pipes/unique-validator.pipe';
import { MailModule } from 'src/mail/mail.module';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';
import { JwtTwoFactorStrategy } from 'src/common/strategy/jwt-two-factor.strategy';
import { JwtStrategy } from 'src/common/strategy/jwt.strategy';
import { UserEntity } from './entity/user.entity';
const redisPort = process.env.REDIS_PORT
  ? parseInt(process.env.REDIS_PORT, 10)
  : 6379;
const LoginThrottleFactory = {
  provide: 'LOGIN_THROTTLE',
  useFactory: () => {
    const redisClient = new Redis({
      enableOfflineQueue: false,
      host: process.env.QUEUE_HOST,
      port: Number(process.env.QUEUE_PORT),
      password: process.env.QUEUE_PASSWORD,
    });

    return new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: process.env.THROTTLE_LOGIN_PREFIX,
      points: parseInt(process.env.THROTTLE_LOGIN_LIMIT),
      duration: 60 * 60 * 24 * 30, // Store number for 30 days since first fail
      blockDuration: parseInt(process.env.THROTTLE_LOGIN_BLOCK_DURATION),
    });
  },
};

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: parseInt(process.env.JWT_EXPIRES_IN),
        },
      }),
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    TypeOrmModule.forFeature([UserRepository]),
    MailModule,
    RefreshTokenModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtTwoFactorStrategy,
    JwtStrategy,
    UniqueValidatorPipe,
    LoginThrottleFactory,
  ],
  exports: [
    AuthService,
    JwtTwoFactorStrategy,
    JwtStrategy,
    PassportModule,
    JwtModule,
    TypeOrmModule,
  ],
})
export class AuthModule {}
