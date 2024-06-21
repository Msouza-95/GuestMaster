import { Request, Response } from "express";
import  CreateUserUseCase  from "module/user/use-cases/create-user"
import ShowUserUseCase from "module/user/use-cases/show-user";
import { container } from "tsyringe";





export class UserControler{

  async create(request: Request, response: Response): Promise<Response> {

    // recupera os dados do body da rota
    const { name , email, password } = request.body;

      // resolve depedencia
    const createUserUseCase = container.resolve(CreateUserUseCase)


      // envia os dados para serviço de criação
    const newuser = await createUserUseCase.execute({name, email, password})

    return response.status(201).json({user: newuser})
  }
  async show(request: Request, response: Response): Promise<Response> {


    const showUserUseCase = container.resolve(ShowUserUseCase)

    const user = await showUserUseCase.execute()

    return response.status(201).json({user: user})
  }
}
