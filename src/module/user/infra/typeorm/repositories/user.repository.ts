import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/typeorm/dataSource";
import IUserRepository from "module/user/repositories/I-user-repository";
import { CreateUserDTO } from "module/user/dtos/create-user-DTO";
import { User } from "../entities/user.entity";



class UserRepository extends Repository<User>  implements IUserRepository{
  constructor() {
      super(User, AppDataSource.manager);
  }

  //  cria e salva um user no banco
  public async createUser(data: CreateUserDTO): Promise<User>{

    const user = this.create(data)

    await this.save(user)

    return user

  }

  // salva um user no banco
  public async saveUser(user: User): Promise<User> {

    const updateUser = await this.save(user)

    return updateUser
  }


  // retorna todos os usuairos
  public async show(): Promise<User[]> {
    const users = await this.find()

    return users
  }

  // buscar user pelo id
  public async findById(user_id: string): Promise<User | null> {
    const user =await this.findOneBy({id: user_id})

    return user
  }

// buscar user pelo email
  public async findByEmail(email: string): Promise<User | null> {

    const user =await this.findOneBy({email})

    return user
  }
}

export default UserRepository
