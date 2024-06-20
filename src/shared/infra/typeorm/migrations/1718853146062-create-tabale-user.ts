import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTabaleUser1718853146062 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'users',
          columns: [
            {
              name: 'id',
              type: 'nvarchar(36)', //para pode aceitar type uuid no sql server
              isPrimary: true,
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'email',
              type: 'varchar',
              isUnique: true,
            },

            {
              name: 'password',
              type: 'varchar',
            },
            {
              name: 'created_at',
              type: 'datetime',
              default: 'GETDATE()',
            },
            {
              name: 'updated_at',
              type: 'datetime',
              default: 'GETDATE()',
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('users');
    }

}
