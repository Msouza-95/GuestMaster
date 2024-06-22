import { CreateBookingDTO } from "../dtos/create-booking-DTO";
import { Booking } from "../infra/typeorm/entities/booking.entity";



export default interface IBookingRepository {
  createBooking(data: CreateBookingDTO): Promise<Booking>;
  show(): Promise<Booking[]>;
  saveBooking(booking: Booking): Promise<Booking>;
  findById(booking_id: string): Promise<Booking | null>;
  findByGuestId(guest_id: string): Promise<Booking []>;
  findByDate(start_date: Date, end_date: Date): Promise<Booking []>;
}
