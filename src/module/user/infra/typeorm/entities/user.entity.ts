
import { MyBaseEntity } from '@shared/infra/typeorm/baseEntities/base.entities';
import {
  Column,
  Entity,
} from 'typeorm';

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
