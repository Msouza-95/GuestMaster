import { container } from 'tsyringe';
import { hash } from 'bcryptjs';
import { inject, injectable } from "tsyringe";
import { User } from "../infra/typeorm/entities/user.entity";
import IUserRepository from "../repositories/I-user-repository";
import AppError from "@shared/errors/AppError";


interface IRequest {
  email: string;
  password: string;
  name: string
}

@injectable()
class CreateUserUseCase{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

  ) {}

   async execute({email,password,name}:IRequest):Promise<User| number>{

    /*
     Verifica se existe usuario com email fornecido.
     Caso já tenha não dar prosseguimento no cadastro
    */
    const userExist = await this.userRepository.findByEmail(email);

    if(userExist){
      throw new AppError('conflict, user already exists', 409)

    }

    // criar hash na senha
     const hashPassword = await hash(password, 8);

    // cria user
    const newUser = await this.userRepository.createUser({
      name,
      email,
      password: hashPassword,
    });

    return newUser;
  }
}


export default CreateUserUseCase;
