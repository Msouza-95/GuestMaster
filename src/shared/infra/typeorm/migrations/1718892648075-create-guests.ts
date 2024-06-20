import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGuests1718892648075 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.createTable(
        new Table({
          name: 'guests',
          columns: [
            {
              name: 'id',
              type: 'nvarchar(36)', //para pode aceitar type uuid no sql server
              isPrimary: true,
            },
            {
              name: 'fullname',
              type: 'varchar',
            },
            {
              name: 'email',
              type: 'varchar',
              isUnique: true,
            },

            {
              name: 'phone',
              type: 'nvarchar(20)',
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
      await queryRunner.dropTable('guests');
    }

}
