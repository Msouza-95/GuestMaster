import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { AppDataSource } from "@shared/infra/typeorm/dataSource";
import IUserRepository from "module/user/repositories/I-user-repository";
import { ICreateUserDTO } from "module/guest/dtos/create-user-DTO";





class UserRepository extends Repository<User>  implements IUserRepository{
  constructor() {
      super(User, AppDataSource.manager);
  }

  //  cria e salva um user no banco
  public async createUser(data: ICreateUserDTO): Promise<User>{

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
      return await this.findOneBy({ email });
  }
}

export default UserRepository
