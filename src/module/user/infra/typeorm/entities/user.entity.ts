
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { uuid } from 'uuidv4';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({type: 'varchar', unique: true})
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'GETDATE()' })
  created_at: Date;

  @UpdateDateColumn({type: 'datetime', default: () => 'GETDATE()', onUpdate: 'GETDATE()' })
  updated_at: Date;


  // start a entidade com id já criado
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
