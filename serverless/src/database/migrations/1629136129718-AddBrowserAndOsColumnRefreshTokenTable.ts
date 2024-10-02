import {
  MigrationInterface,
  QueryRunner,
  TableColumn
} from 'typeorm';

export class AddBrowserAndOsColumnRefreshTokenTable1629136129718
  implements MigrationInterface
{
  tableName = 'refresh_token';
  columns = [
    new TableColumn({
      name: 'browser',
      type: 'varchar',
      isNullable: true,
      length: '200'
    }),
    new TableColumn({
      name: 'os',
      type: 'varchar',
      isNullable: true,
      length: '200'
    })
  ];
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns(this.tableName, this.columns);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns(this.tableName, this.columns);
  }
}
