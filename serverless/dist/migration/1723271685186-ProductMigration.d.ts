import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ProductMigration1723271685186 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
