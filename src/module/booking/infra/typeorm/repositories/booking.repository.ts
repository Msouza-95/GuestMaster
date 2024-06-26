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

    const booking = this.create({
      start_date_booking: data.start_date_booking,
      end_date_booking: data.end_date_booking,
      total_price: data.total_price,
      hotel_id: data.hotel_id,
      guest_id: data.guest_id,
      room_id: data.room_id
    })

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
  public async findByGuestId(guest_id: string): Promise<Booking[]> {

    const bookings  =await this.find({where:{ guest_id}, relations:[ "guest", "hotel","room"]})

    return bookings
  }

  public async findByDate(start_date: Date, end_date: Date): Promise<Booking[]> {

    const bookings  =await this.createQueryBuilder("booking")
    .leftJoinAndSelect("booking.room", "room")
    .leftJoinAndSelect("booking.guest", "guest")
    .leftJoinAndSelect("booking.hotel", "hotel")
    .where("booking.created_at >= :start_date", { start_date })
    .andWhere("booking.created_at <= :end_date", { end_date })
    .getMany();

    return bookings

  }
}

export default BookingRepository

