
import UserRepository from 'module/user/infra/typeorm/repositories/user.repository';
import IUserRepository from 'module/user/repositories/I-user-repository';
import { container } from 'tsyringe';


container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository
);
