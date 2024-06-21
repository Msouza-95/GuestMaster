

import { CreateUserDTO } from '../dtos/create-user-DTO';
import { User } from '../infra/typeorm/entities/user.entity';

export default interface IUserRepository {
  createUser(data: CreateUserDTO): Promise<User>;
  show(): Promise<User[]>;
  saveUser(user: User): Promise<User>;
  findById(user_id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
