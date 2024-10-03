import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class EmailTemplate1622305543735 implements MigrationInterface {
  tableName = 'email_templates';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
      false,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
