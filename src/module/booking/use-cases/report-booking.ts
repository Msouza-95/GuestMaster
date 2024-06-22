
import { inject, injectable } from "tsyringe";;
import AppError from "@shared/errors/AppError";
import IGuestRepository from "module/guest/repositories/I-guest-repository";
import IBookingRepository from "../repositories/I-booking-repository";
import { Booking } from "../infra/typeorm/entities/booking.entity";


interface IRequest {
 start_date: string ;
 end_date : string;
}

@injectable()
class ReportBookingUseCase{
  constructor(

    @inject('BookingRepository')
    private bookingRepository: IBookingRepository,

  ) {}

   async execute({
     start_date,
     end_date
    }:IRequest):Promise<Booking []>{


      const start = new Date(start_date)
      const end = new Date(end_date)

      if(start > end){
        throw new AppError("The start date must be less than the end date", 409)
      }

      const bookings = await this.bookingRepository.findByDate(start,end)

      return bookings
  }
}


export default ReportBookingUseCase;
