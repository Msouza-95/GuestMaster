import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRooms1718893478232 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'rooms',
          columns: [
            {
              name: 'id',
              type: 'nvarchar(36)', //para pode aceitar type uuid no sql server
              isPrimary: true,
            },
            {
              name: 'room_number',
              type: 'varchar',
            },
            {
              name: 'room_type',
              type: 'varchar', // sql serve não suporta tipo enum, então será controlado na aplicação
              default: "'Quarto Básico'",
            },

            {
              name: 'status',
              type: 'varchar',
              default: "'Disponível'",
            },
            {
              name: 'price_per_night',
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
      await queryRunner.dropTable('rooms');
    }

}
