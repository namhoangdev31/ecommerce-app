"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeormConfig_1 = require("./config/typeormConfig");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const path = __importStar(require("path"));
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const nestjs_i18n_1 = require("nestjs-i18n");
const nest_winston_1 = require("nest-winston");
const auth_module_1 = require("./auth/auth.module");
const roles_module_1 = require("./role/roles.module");
const permissions_module_1 = require("./permission/permissions.module");
const ormConfig = __importStar(require("./config/ormconfig"));
const throttleConfig = __importStar(require("./config/throttle-config"));
const mail_module_1 = require("./mail/mail.module");
const email_template_module_1 = require("./email-template/email-template.module");
const refresh_token_module_1 = require("./refresh-token/refresh-token.module");
const i18n_exception_filter_pipe_1 = require("./common/pipes/i18n-exception-filter.pipe");
const custom_validation_pipe_1 = require("./common/pipes/custom-validation.pipe");
const twofa_module_1 = require("./twofa/twofa.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const winston_1 = __importDefault(require("./config/winston"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '../.env' });
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_winston_1.WinstonModule.forRoot(winston_1.default),
            throttler_1.ThrottlerModule.forRootAsync({
                useFactory: () => throttleConfig,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => ormConfig,
            }),
            nestjs_i18n_1.I18nModule.forRootAsync({
                useFactory: () => ({
                    fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
                    loaderOptions: {
                        path: path.join(__dirname, '/i18n/'),
                        watch: true,
                    },
                }),
                resolvers: [
                    {
                        use: nestjs_i18n_1.QueryResolver,
                        options: ['lang', 'locale', 'l'],
                    },
                    new nestjs_i18n_1.HeaderResolver(['x-custom-lang']),
                    new nestjs_i18n_1.CookieResolver(['lang', 'locale', 'l']),
                ],
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
                exclude: ['/api*'],
            }),
            auth_module_1.AuthModule,
            roles_module_1.RolesModule,
            permissions_module_1.PermissionsModule,
            mail_module_1.MailModule,
            email_template_module_1.EmailTemplateModule,
            refresh_token_module_1.RefreshTokenModule,
            twofa_module_1.TwofaModule,
            dashboard_module_1.DashboardModule,
            typeorm_1.TypeOrmModule.forRoot(typeormConfig_1.typeOrmConfig),
        ],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_PIPE,
                useClass: custom_validation_pipe_1.CustomValidationPipe,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: i18n_exception_filter_pipe_1.I18nExceptionFilterPipe,
            },
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map