import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductMigration1723271685186 implements MigrationInterface {
  name = 'ProductMigration1723271685186';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "imageSrcPath" character varying, "deployUrl" character varying, "productName" character varying NOT NULL, "overview" character varying NOT NULL, "mainTechnology" character varying NOT NULL, "subTechnology" character varying, "productLinks" text array, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product"`);
  }
}
