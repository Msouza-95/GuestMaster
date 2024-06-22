
import { inject, injectable } from "tsyringe";;
import AppError from "@shared/errors/AppError";
import IGuestRepository from "../repositories/I-guest-repository";
import { Guest } from "../infra/typeorm/entities/guest.entity";



interface IRequest {
    fullname : string;
    email: string;
    phone: string;
    birthdayDate: string;
    city :string;
    state: string;
    country: string;
}

@injectable()
class CreateGuestUseCase{
  constructor(
    @inject('GuestRepository')
    private guestRepository: IGuestRepository,

  ) {}

   async execute({
    fullname,
    email,
    phone,
    birthdayDate,
    city,
    state,
    country
  }:IRequest):Promise<Guest>{

    /*
     Verifica se guest  já foi cadastrado
    */
    const guestExist = await this.guestRepository.findByEmail(email)

    if(guestExist){
      throw new AppError('conflict, The guest already exists', 409)

    }

    // criar um  novo guest

    const guest = await this.guestRepository.createGuest({
      email,
      fullname,
      phone,
      birthdayDate,
      city,
      state,
      country
    })

    return guest
  }
}


export default CreateGuestUseCase;
