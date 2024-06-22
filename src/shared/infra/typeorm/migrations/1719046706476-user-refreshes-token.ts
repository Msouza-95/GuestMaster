import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class UserRefreshesToken1719046706476 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table
        ({
            name: 'users_refreshes_tokens',
            columns: [
                {
                    name: 'id',
                    type: 'nvarchar(36)',
                    isPrimary: true
                },
                {
                    name: 'refresh_token',
                    type: 'varchar'
                },
                {
                    name: 'expires_date',
                    type: 'datetimeoffset'
                },
                {
                  name: 'user_id',
                  type: 'nvarchar(36)' //para pode aceitar type uuid no sql server
                }
            ],
        }),
    );

    await queryRunner.createForeignKey(
        'users_refreshes_tokens',
        new TableForeignKey({
            name: 'FK_user_refresh_token',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION',
        }),
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('users_refreshes_tokens', 'FK_user_refresh_token');
      await queryRunner.dropTable('users_refreshes_tokens');

    }

}
