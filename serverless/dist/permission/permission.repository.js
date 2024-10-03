"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionRepository = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const permission_entity_1 = require("./entities/permission.entity");
const base_repository_1 = require("../common/repository/base.repository");
const permission_serializer_1 = require("./serializer/permission.serializer");
let PermissionRepository = class PermissionRepository extends base_repository_1.BaseRepository {
    async syncPermission(permissionsList) {
        await this.createQueryBuilder('permission')
            .insert()
            .into(permission_entity_1.PermissionEntity)
            .values(permissionsList)
            .orIgnore()
            .execute();
    }
    transform(model, transformOption = {}) {
        return (0, class_transformer_1.plainToClass)(permission_serializer_1.Permission, (0, class_transformer_1.classToPlain)(model, transformOption), transformOption);
    }
    transformMany(models, transformOption = {}) {
        return models.map((model) => this.transform(model, transformOption));
    }
};
exports.PermissionRepository = PermissionRepository;
exports.PermissionRepository = PermissionRepository = __decorate([
    (0, typeorm_1.EntityRepository)(permission_entity_1.PermissionEntity)
], PermissionRepository);
//# sourceMappingURL=permission.repository.js.map