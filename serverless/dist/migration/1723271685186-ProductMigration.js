"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductMigration1723271685186 = void 0;
class ProductMigration1723271685186 {
    constructor() {
        this.name = 'ProductMigration1723271685186';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "imageSrcPath" character varying, "deployUrl" character varying, "productName" character varying NOT NULL, "overview" character varying NOT NULL, "mainTechnology" character varying NOT NULL, "subTechnology" character varying, "productLinks" text array, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "product"`);
    }
}
exports.ProductMigration1723271685186 = ProductMigration1723271685186;
//# sourceMappingURL=1723271685186-ProductMigration.js.map