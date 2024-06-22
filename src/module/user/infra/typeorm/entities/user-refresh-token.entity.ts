import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';



@Entity('users_refreshes_tokens')
class UserRefreshToken {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  refresh_token: string;

  @Column()
  expires_date: Date;

  @Column()
  user_id: string;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }

  // RELATIONS
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export default UserRefreshToken;
