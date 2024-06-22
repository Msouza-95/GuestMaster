

import {
  Column,
  Entity,
} from 'typeorm';
import { MyBaseEntity } from './base.entity';

@Entity('users')
export class User extends MyBaseEntity {

  @Column()
  name: string;

  @Column({type: 'varchar', unique: true})
  email: string;

  @Column()
  password: string;

  constructor() {
      super()
  }
}
