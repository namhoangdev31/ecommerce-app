"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const mailer_1 = require("@nestjs-modules/mailer");
const pug_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/pug.adapter");
const mail_service_1 = require("./mail.service");
const mail_processor_1 = require("./mail.processor");
const email_template_module_1 = require("../email-template/email-template.module");
let MailModule = class MailModule {
};
exports.MailModule = MailModule;
exports.MailModule = MailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            email_template_module_1.EmailTemplateModule,
            bull_1.BullModule.registerQueueAsync({
                name: process.env.MAIL_QUEUE_NAME,
                useFactory: () => ({
                    redis: {
                        host: process.env.QUEUE_HOST,
                        port: parseInt(process.env.QUEUE_PORT, 10),
                        password: process.env.QUEUE_PASSWORD,
                        retryStrategy(times) {
                            return Math.min(times * 50, 2000);
                        }
                    }
                })
            }),
            mailer_1.MailerModule.forRootAsync({
                useFactory: () => ({
                    transport: {
                        host: process.env.MAIL_HOST,
                        port: parseInt(process.env.MAIL_PORT, 10),
                        secure: process.env.MAIL_SECURE === 'true',
                        ignoreTLS: process.env.MAIL_IGNORE_TLS === 'true',
                        auth: {
                            user: process.env.MAIL_USER,
                            pass: process.env.MAIL_PASS
                        }
                    },
                    defaults: {
                        from: `"${process.env.MAIL_FROM}" <${process.env.MAIL_FROM_EMAIL}>`
                    },
                    preview: process.env.MAIL_PREVIEW === 'true',
                    template: {
                        dir: __dirname + '/templates/email/layouts/',
                        adapter: new pug_adapter_1.PugAdapter(),
                        options: {
                            strict: true
                        }
                    }
                })
            })
        ],
        controllers: [],
        providers: [mail_service_1.MailService, mail_processor_1.MailProcessor],
        exports: [mail_service_1.MailService]
    })
], MailModule);
//# sourceMappingURL=mail.module.js.map