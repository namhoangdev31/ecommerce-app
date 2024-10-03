"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleSerializer = exports.basicFieldGroupsForSerializing = exports.adminUserGroupsForSerializing = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const model_serializer_1 = require("../../common/serializer/model.serializer");
const permission_serializer_1 = require("../../permission/serializer/permission.serializer");
exports.adminUserGroupsForSerializing = ['admin'];
exports.basicFieldGroupsForSerializing = ['basic'];
class RoleSerializer extends model_serializer_1.ModelSerializer {
}
exports.RoleSerializer = RoleSerializer;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RoleSerializer.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_transformer_1.Expose)({
        groups: exports.basicFieldGroupsForSerializing
    }),
    __metadata("design:type", String)
], RoleSerializer.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => permission_serializer_1.Permission),
    __metadata("design:type", Array)
], RoleSerializer.prototype, "permission", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_transformer_1.Expose)({
        groups: exports.basicFieldGroupsForSerializing
    }),
    __metadata("design:type", Date)
], RoleSerializer.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_transformer_1.Expose)({
        groups: exports.basicFieldGroupsForSerializing
    }),
    __metadata("design:type", Date)
], RoleSerializer.prototype, "updatedAt", void 0);
//# sourceMappingURL=role.serializer.js.map