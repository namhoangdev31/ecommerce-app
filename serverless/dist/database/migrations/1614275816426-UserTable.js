"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTable1614275816426 = void 0;
const typeorm_1 = require("typeorm");
class UserTable1614275816426 {
    constructor() {
        this.tableName = 'user';
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
                    name: 'username',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true,
                    length: '100',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true,
                    length: '100',
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'address',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'contact',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'salt',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'token',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'status',
                    type: 'varchar',
                    default: `'active'`,
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
        await queryRunner.addColumn(this.tableName, new typeorm_1.TableColumn({
            name: 'roleId',
            type: 'int',
        }));
        await queryRunner.createForeignKey(this.tableName, new typeorm_1.TableForeignKey({
            columnNames: ['roleId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'role',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable(this.tableName);
        const foreignKey = await table.foreignKeys.find((fk) => fk.columnNames.indexOf('roleId') !== -1);
        await queryRunner.dropForeignKey(this.tableName, foreignKey);
        await queryRunner.dropColumn(this.tableName, 'roleId');
        await queryRunner.dropTable(this.tableName);
    }
}
exports.UserTable1614275816426 = UserTable1614275816426;
//# sourceMappingURL=1614275816426-UserTable.js.map