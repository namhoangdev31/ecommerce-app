import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class PermissionTable1614275788549 implements MigrationInterface {
  tableName = 'permissions';
  indexFields = ['resource', 'description'];

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
            type: 'varchar', // Change from 'nvarchar' to 'varchar'
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
            name: 'createdAt',
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      false,
    );

    for (const field of this.indexFields) {
      await queryRunner.createIndex(
        this.tableName,
        new TableIndex({
          name: `IDX_PERMISSION_${field.toUpperCase()}`,
          columnNames: [field],
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);
    for (const field of this.indexFields) {
      const index = `IDX_PERMISSION_${field.toUpperCase()}`;
      const keyIndex = table.indices.find(
        (fk) => fk.name.indexOf(index) !== -1,
      );
      if (keyIndex) {
        await queryRunner.dropIndex(this.tableName, keyIndex);
      }
    }
    await queryRunner.dropTable(this.tableName);
  }
}
