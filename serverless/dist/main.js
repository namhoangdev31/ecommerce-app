"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const helmet_1 = __importDefault(require("helmet"));
const swagger_1 = require("@nestjs/swagger");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const nest_winston_1 = require("nest-winston");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const port = process.env.NEST_PORT || 3000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    app.useLogger(app.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER));
    if (process.env.NODE_ENV === 'development') {
        app.enableCors({
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
        });
        const swaggerConfig = new swagger_1.DocumentBuilder()
            .setTitle(process.env.APP_NAME)
            .setDescription(process.env.APP_DESCRIPTION)
            .setVersion(process.env.APP_VERSION)
            .addBearerAuth()
            .build();
        const customOptions = {
            swaggerOptions: {
                persistAuthorization: true,
            },
            customSiteTitle: process.env.APP_DESCRIPTION,
        };
        const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
        swagger_1.SwaggerModule.setup('api-docs', app, document, customOptions);
    }
    else {
        const whitelist = [process.env.APP_FRONTEND_URL];
        app.enableCors({
            origin: function (origin, callback) {
                if (!origin || whitelist.indexOf(origin) !== -1) {
                    callback(null, true);
                }
                else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true,
        });
    }
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), {
        fallbackOnErrors: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.use((0, cookie_parser_1.default)());
    await app.listen(port);
    console.log(`Application listening in port: ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map