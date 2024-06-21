
import { inject, injectable } from "tsyringe";;
import AppError from "@shared/errors/AppError";
import { Guest } from "../infra/typeorm/entities/guest.entity";
import IGuestRepository from "../repositories/I-guest-repository";




interface IRequest {
  guest_id: string
}

@injectable()
class ShowGuestUseCase{
  constructor(
    @inject('GuestRepository')
    private guestRepository: IGuestRepository,
  ) {}


  /*retornas todos os hotels*/
   async showExecute():Promise<Guest[]>{


    const guest = await this.guestRepository.show()

    return guest
  }

  /* retorna um hotel pelo id*/
   async readExecute({guest_id}:IRequest):Promise<Guest>{


    const guest = await this.guestRepository.findById(guest_id!)


    if(guest === null){
      throw new AppError("The guest d'not exists", 404)

    }

    return guest
  }

}


export default ShowGuestUseCase;
