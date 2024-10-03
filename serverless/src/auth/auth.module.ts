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

const LoginThrottleFactory = {
  provide: 'LOGIN_THROTTLE',
  useFactory: () => {
    const redisClient = new Redis({
      enableOfflineQueue: false,
      host: process.env.QUEUE_HOST,
      port: parseInt(process.env.QUEUE_PORT, 10),
      password: process.env.QUEUE_PASSWORD,
    });

    return new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: process.env.THROTTLE_LOGIN_PREFIX,
      points: parseInt(process.env.THROTTLE_LOGIN_LIMIT, 10),
      duration: parseInt(process.env.THROTTLE_LOGIN_DURATION, 10),
      blockDuration: parseInt(process.env.THROTTLE_LOGIN_BLOCK_DURATION, 10),
    });
  },
};

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRES_IN,
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
  ],
})
export class AuthModule {}
