
import { inject, injectable } from "tsyringe";;
import AppError from "@shared/errors/AppError";
import IGuestRepository from "module/guest/repositories/I-guest-repository";
import IBookingRepository from "../repositories/I-booking-repository";
import { Booking } from "../infra/typeorm/entities/booking.entity";


interface IRequest {
 guest_id: string;
}

@injectable()
class ShowBookingUseCase{
  constructor(

    @inject('GuestRepository')
    private guestRepository: IGuestRepository,
    @inject('BookingRepository')
    private bookingRepository: IBookingRepository,

  ) {}

   async execute({
     guest_id,
    }:IRequest):Promise<Booking []>{

    /*
     Validações
    */

    // verificar se guest existe
    const guest = await this.guestRepository.findById(guest_id)

    if(guest === null){
      throw new AppError("The geust d'not exists", 404)

    }

    const bookings = await this.bookingRepository.findByGuestId(guest_id)



    return bookings
  }
}


export default ShowBookingUseCase;
