
import { inject, injectable } from "tsyringe";;
import AppError from "@shared/errors/AppError";
import IHotelRepository from "module/hotel/repositories/I-hotel-repository";
import IGuestRepository from "../repositories/I-guest-repository";



interface IRequest {
    fullname : string;
    email: string;
    phone: string;
    birthdatDate: Date;
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

   async execute({fullname,email,phone,birthdatDate,city,state,country}:IRequest):Promise<Room>{

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
      birthdatDate,
      city,state,
      country
    })

    return guest
  }
}


export default CreateGuestUseCase;
