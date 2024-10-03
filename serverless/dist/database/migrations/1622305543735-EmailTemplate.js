"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplate1622305543735 = void 0;
const typeorm_1 = require("typeorm");
class EmailTemplate1622305543735 {
    constructor() {
        this.tableName = 'email_templates';
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
                    name: 'title',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true,
                    length: '200',
                },
                {
                    name: 'slug',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true,
                    length: '200',
                },
                {
                    name: 'sender',
                    type: 'varchar',
                    isNullable: false,
                    length: '200',
                },
                {
                    name: 'subject',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'body',
                    type: 'varchar',
                    isNullable: true,
                    length: '512',
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
exports.EmailTemplate1622305543735 = EmailTemplate1622305543735;
//# sourceMappingURL=1622305543735-EmailTemplate.js.map