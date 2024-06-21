
import { MyBaseEntity } from '@shared/infra/typeorm/baseEntities/base.entities';
import { Booking } from 'module/booking/infra/typeorm/entities/booking.entity';
import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';

@Entity('guests')
export class Guest extends MyBaseEntity {

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  birthdayDate: Date;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @OneToMany(() => Booking, booking => booking.guest)
  bookings: Booking[];

  constructor() {
      super()
  }
}
