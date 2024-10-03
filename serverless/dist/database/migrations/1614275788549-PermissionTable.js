"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionTable1614275788549 = void 0;
const typeorm_1 = require("typeorm");
class PermissionTable1614275788549 {
    constructor() {
        this.tableName = 'permission';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: this.tableName,
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'resource',
                    type: 'varchar',
                    length: '100',
                },
                {
                    name: 'path',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'varchar',
                    length: '256',
                    isNullable: true,
                    isUnique: true,
                },
                {
                    name: 'method',
                    type: 'varchar',
                    default: `'get'`,
                    length: '20',
                },
                {
                    name: 'isDefault',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), false);
    }
    async down(queryRunner) {
        await queryRunner.dropTable(this.tableName);
    }
}
exports.PermissionTable1614275788549 = PermissionTable1614275788549;
//# sourceMappingURL=1614275788549-PermissionTable.js.map