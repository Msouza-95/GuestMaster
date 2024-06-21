import { inject, injectable } from "tsyringe";
import { User } from "../infra/typeorm/entities/user.entity";
import IUserRepository from "../repositories/I-user-repository";



@injectable()
class ShowUserUseCase{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

  ) {}

   async execute():Promise<User[]>{

    const users = await this.userRepository.show()

    return users
  }
}

export default ShowUserUseCase;
