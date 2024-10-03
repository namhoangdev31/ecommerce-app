"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const ioredis_1 = __importDefault(require("ioredis"));
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const user_repository_1 = require("./user.repository");
const unique_validator_pipe_1 = require("../common/pipes/unique-validator.pipe");
const mail_module_1 = require("../mail/mail.module");
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const refresh_token_module_1 = require("../refresh-token/refresh-token.module");
const jwt_two_factor_strategy_1 = require("../common/strategy/jwt-two-factor.strategy");
const jwt_strategy_1 = require("../common/strategy/jwt.strategy");
const LoginThrottleFactory = {
    provide: 'LOGIN_THROTTLE',
    useFactory: () => {
        const redisClient = new ioredis_1.default({
            enableOfflineQueue: false,
            host: process.env.QUEUE_HOST,
            port: parseInt(process.env.QUEUE_PORT, 10),
            password: process.env.QUEUE_PASSWORD,
        });
        return new rate_limiter_flexible_1.RateLimiterRedis({
            storeClient: redisClient,
            keyPrefix: process.env.THROTTLE_LOGIN_PREFIX,
            points: parseInt(process.env.THROTTLE_LOGIN_LIMIT, 10),
            duration: parseInt(process.env.THROTTLE_LOGIN_DURATION, 10),
            blockDuration: parseInt(process.env.THROTTLE_LOGIN_BLOCK_DURATION, 10),
        });
    },
};
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                useFactory: () => ({
                    secret: process.env.JWT_SECRET,
                    signOptions: {
                        expiresIn: process.env.JWT_EXPIRES_IN,
                    },
                }),
            }),
            passport_1.PassportModule.register({
                defaultStrategy: 'jwt',
            }),
            typeorm_1.TypeOrmModule.forFeature([user_repository_1.UserRepository]),
            mail_module_1.MailModule,
            refresh_token_module_1.RefreshTokenModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            jwt_two_factor_strategy_1.JwtTwoFactorStrategy,
            jwt_strategy_1.JwtStrategy,
            unique_validator_pipe_1.UniqueValidatorPipe,
            LoginThrottleFactory,
        ],
        exports: [
            auth_service_1.AuthService,
            jwt_two_factor_strategy_1.JwtTwoFactorStrategy,
            jwt_strategy_1.JwtStrategy,
            passport_1.PassportModule,
            jwt_1.JwtModule,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map