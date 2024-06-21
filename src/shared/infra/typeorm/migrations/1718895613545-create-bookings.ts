import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

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

  // criar realção das tabelas
    await queryRunner.createForeignKey(
      'bookings',
      new TableForeignKey({
          name: 'FK_room_in_booking',
          referencedTableName: 'rooms',
          referencedColumnNames: ['id'],
          columnNames: ['room_id'],
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION',
        }),
    );

    await queryRunner.createForeignKey(
      'bookings',
      new TableForeignKey({
        name: 'FK_hotel_in_booking',
        referencedTableName: 'hotels',
        referencedColumnNames: ['id'],
        columnNames: ['hotel_id'],
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
        }),
    );

    await queryRunner.createForeignKey(
      'bookings',
      new TableForeignKey({
        name: 'FK_guest_in_booking',
        referencedTableName: 'guests',
        referencedColumnNames: ['id'],
        columnNames: ['guest_id'],
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
        }),
    );

  }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('bookings');
    }

}
