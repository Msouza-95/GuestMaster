import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateHotels1718893231831 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.createTable(
        new Table({
          name: 'hotels',
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
              name: 'address',
              type: 'varchar',
            },

            {
              name: 'description',
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
      await queryRunner.dropTable('hotels');
    }

}
