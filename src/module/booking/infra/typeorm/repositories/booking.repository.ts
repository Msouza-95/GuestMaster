import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/typeorm/dataSource";
import IBookingRepository from "module/booking/repositories/I-booking-repository";
import { Booking } from "../entities/booking.entity";
import { CreateBookingDTO } from "module/booking/dtos/create-booking-DTO";





class BookingRepository extends Repository<Booking>  implements IBookingRepository{
  constructor() {
      super(Booking, AppDataSource.manager);
  }

  //  cria e salva um dados no banco
  public async createBooking(data: CreateBookingDTO): Promise<Booking>{

    const booking = this.create(data)

    await this.save(booking)

    return booking

  }

  public async saveBooking(Booking: Booking): Promise<Booking> {

    const updateBooking = await this.save(Booking)

    return updateBooking
  }



  public async show(): Promise<Booking[]> {
    const booking = await this.find()

    return booking
  }

  // buscar booking pelo id
  public async findById(user_id: string): Promise<Booking | null> {
    const booking  =await this.findOneBy({id: user_id})

    return booking
  }


}

export default BookingRepository

