import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class PermissionRoleTable1614275796207 implements MigrationInterface {
  foreignKeysArray = [
    {
      table: 'roles',
      field: 'roleId',
      reference: 'id',
    },
    {
      table: 'permissions',
      field: 'permissionId',
      reference: 'id',
    },
  ];
  tableName = 'role_permissions';

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
            generationStrategy: 'increment'
          },
          {
            name: 'roleId',
            type: 'int',
          },
          {
            name: 'permissionId',
            type: 'int',
          }
        ],
      }),
      false,
    );

    // Create foreign keys after ensuring columns exist
    for (const foreignKey of this.foreignKeysArray) {
      await queryRunner.createForeignKey(
        this.tableName,
        new TableForeignKey({
          columnNames: [foreignKey.field],
          referencedColumnNames: [foreignKey.reference],
          referencedTableName: foreignKey.table,
          onDelete: 'CASCADE',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);
    for (const key of this.foreignKeysArray) {
      const foreignKey = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf(key.field) !== -1,
      );
      await queryRunner.dropForeignKey(this.tableName, foreignKey);
      await queryRunner.dropColumn(this.tableName, key.field);
    }
    await queryRunner.dropTable(this.tableName);
  }
}
