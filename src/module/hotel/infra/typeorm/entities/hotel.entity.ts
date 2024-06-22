


import { MyBaseEntity } from '@module/user/infra/typeorm/entities/base.entity';
import { Booking } from '@module/booking/infra/typeorm/entities/booking.entity';
import { Room } from '@module/room/infra/typeorm/entities/room.entity';
import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';

@Entity('hotels')
export class Hotel extends MyBaseEntity {

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @OneToMany(() => Room, room => room.hotel)
  rooms: Room[];

  @OneToMany(() => Booking, booking => booking.hotel)
  bookings: Booking[];

  constructor() {
      super()
  }
}
