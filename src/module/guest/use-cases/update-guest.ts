
import { inject, injectable } from "tsyringe";;
import AppError from "@shared/errors/AppError";
import IGuestRepository from "../repositories/I-guest-repository";
import { Guest } from "../infra/typeorm/entities/guest.entity";


interface IRequest {
    fullname : string;
    email: string;
    phone: string;
    birthdayDate: Date;
    city :string;
    state: string;
    country: string;
    guest_id:string
}

@injectable()
class UpdateGuestUseCase{
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
    guest_id,
    country
  }:IRequest):Promise<Guest>{

    /*
     Verifica se hotel é valido
    */
    const guest = await this.guestRepository.findById(guest_id)
    if(guest === null){
      throw new AppError("The guest d'not exists", 404)

    }

    guest.fullname =fullname;
    guest.email = email
    guest.phone =phone;
    guest.state =state;
    guest.birthdayDate =birthdayDate;
    guest.city =city;
    guest.country =country

    await this.guestRepository.saveGuest(guest)

    return guest
  }
}


export default UpdateGuestUseCase;
