
import { MyBaseEntity } from '@shared/infra/typeorm/baseEntities/base.entities';
import { Booking } from 'module/booking/infra/typeorm/entities/booking.entity';
import { Hotel } from 'module/hotel/infra/typeorm/entities/hotel.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('rooms')
export class Room extends MyBaseEntity {

  @Column()
  room_number: string;

  @Column()
  room_type: string;

  @Column()
  status: string;

  @Column()
  hotel_id: string;

  // relação
  @ManyToOne(() => Hotel)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @OneToMany(() => Booking, booking => booking.room)
  bookings: Booking[];

  constructor() {
      super()
  }
}
