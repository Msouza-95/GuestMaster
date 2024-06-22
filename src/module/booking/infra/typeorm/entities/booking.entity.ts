
import { MyBaseEntity } from '@module/user/infra/typeorm/entities/base.entity';
import { Guest } from '@module/guest/infra/typeorm/entities/guest.entity';
import { Hotel } from '@module/hotel/infra/typeorm/entities/hotel.entity';
import { Room } from '@module/room/infra/typeorm/entities/room.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('bookings')
export class Booking extends MyBaseEntity {

  @Column()
  total_price: number;

  @Column({default: 'Confirmada'})
  status: string;

  @Column()
  start_date_booking: Date;

  @Column()
  end_date_booking: Date;

  @Column()
  hotel_id: string;

  @Column()
  guest_id: string;

  @Column()
  room_id: string;

  // relação
  @ManyToOne(() => Hotel)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @ManyToOne(() => Guest)
  @JoinColumn({ name: 'guest_id' })
  guest: Guest;

  @ManyToOne(() => Room)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  constructor() {
      super()
  }
}
