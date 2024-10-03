"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleTable1614275766942 = void 0;
const typeorm_1 = require("typeorm");
class RoleTable1614275766942 {
    constructor() {
        this.tableName = 'role';
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
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true,
                    length: '100',
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
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
exports.RoleTable1614275766942 = RoleTable1614275766942;
//# sourceMappingURL=1614275766942-RoleTable.js.map