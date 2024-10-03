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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const email_template_service_1 = require("../email-template/email-template.service");
const process = __importStar(require("process"));
let MailService = class MailService {
    constructor(mailQueue, emailTemplateService) {
        this.mailQueue = mailQueue;
        this.emailTemplateService = emailTemplateService;
    }
    stringInject(str = '', obj = {}) {
        let newStr = str;
        Object.keys(obj).forEach((key) => {
            const placeHolder = `{{${key}}}`;
            if (newStr.includes(placeHolder)) {
                newStr = newStr.replace(placeHolder, obj[key] || ' ');
            }
        });
        return newStr;
    }
    async sendMail(payload, type) {
        const mailBody = await this.emailTemplateService.findBySlug(payload.slug);
        payload.context.content = this.stringInject(mailBody.body, payload.context);
        if (mailBody) {
            try {
                await this.mailQueue.add(type, {
                    payload,
                });
                return true;
            }
            catch (error) {
                return false;
            }
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)(process.env.MAIL_QUEUE_NAME)),
    __metadata("design:paramtypes", [Object, email_template_service_1.EmailTemplateService])
], MailService);
//# sourceMappingURL=mail.service.js.map