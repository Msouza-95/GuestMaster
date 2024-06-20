import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBookings1718895613545 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bookings',
        columns: [
          {
            name: 'id',
            type: 'nvarchar(36)', //para pode aceitar type uuid no sql server
            isPrimary: true,
          },
          {
             name: 'guest_id',
            type: 'nvarchar(36)'
          },
          {
            name: 'room_id',
           type: 'nvarchar(36)'
          },
          {
            name: 'hotel_id',
           type: 'nvarchar(36)'
           },
           {
            name: 'total_price',
           type: 'decimal(10,2)',
           },
           {
            name: 'start_date_booking',
            type: 'datetime',
          },
          {
            name: 'end_date_booking',
            type: 'datetime',
          },
          {
            name: 'status',
            type: 'varchar', // sql serve não suporta tipo enum, então será controlado na aplicação
            default: "'Confirmada'",
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
      await queryRunner.dropTable('bookings');
    }

}
