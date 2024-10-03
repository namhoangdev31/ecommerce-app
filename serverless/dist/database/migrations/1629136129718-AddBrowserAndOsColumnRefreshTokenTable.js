"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddBrowserAndOsColumnRefreshTokenTable1629136129718 = void 0;
const typeorm_1 = require("typeorm");
class AddBrowserAndOsColumnRefreshTokenTable1629136129718 {
    constructor() {
        this.tableName = 'refresh_token';
        this.columns = [
            new typeorm_1.TableColumn({
                name: 'browser',
                type: 'varchar',
                isNullable: true,
                length: '200'
            }),
            new typeorm_1.TableColumn({
                name: 'os',
                type: 'varchar',
                isNullable: true,
                length: '200'
            })
        ];
    }
    async up(queryRunner) {
        await queryRunner.addColumns(this.tableName, this.columns);
    }
    async down(queryRunner) {
        await queryRunner.dropColumns(this.tableName, this.columns);
    }
}
exports.AddBrowserAndOsColumnRefreshTokenTable1629136129718 = AddBrowserAndOsColumnRefreshTokenTable1629136129718;
//# sourceMappingURL=1629136129718-AddBrowserAndOsColumnRefreshTokenTable.js.map