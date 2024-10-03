"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmsModule = void 0;
const cms_controller_1 = require("./cms.controller");
const common_1 = require("@nestjs/common");
const cms_service_1 = require("./cms.service");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '../.env' });
let CmsModule = class CmsModule {
};
exports.CmsModule = CmsModule;
exports.CmsModule = CmsModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [cms_controller_1.CmsController],
        exports: [cms_service_1.CmsService],
        providers: [cms_service_1.CmsService],
    })
], CmsModule);
//# sourceMappingURL=cms.module.js.map