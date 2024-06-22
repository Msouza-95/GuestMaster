
import { inject, injectable } from "tsyringe";;
import AppError from "@shared/errors/AppError";
import IHotelRepository from "module/hotel/repositories/I-hotel-repository";
import IGuestRepository from "module/guest/repositories/I-guest-repository";
import IBookingRepository from "../repositories/I-booking-repository";
import IRoomRepository from "module/room/repositories/I-room-repository";
import { Booking } from "../infra/typeorm/entities/booking.entity";
import { statusRoomEnum } from "module/room/dtos/create-room-DTO";


interface IRequest {
 start_date_booking : string;
 end_date_booking: string;
 total_price: number;
 hotel_id: string;
 guest_id: string;
 room_id: string;
}

@injectable()
class CreateBookingUseCase{
  constructor(
    @inject('RoomRepository')
    private roomRepository: IRoomRepository,
    @inject('HotelRepository')
    private hotelRepository: IHotelRepository,
    @inject('GuestRepository')
    private guestRepository: IGuestRepository,
    @inject('BookingRepository')
    private bookingRepository: IBookingRepository,

  ) {}

   async execute({
     start_date_booking,
     end_date_booking,
     total_price,
     hotel_id,
     guest_id,
     room_id
    }:IRequest):Promise<Booking>{

    /*
     Validações
    */

     // verificar se o hotel existe
    const hotelExist = await this.hotelRepository.findById(hotel_id)

    if(hotelExist === null){
      throw new AppError("The hotel d'not exists", 404)

    }

    // verificar se guest existe
    const guestExist = await this.guestRepository.findById(guest_id)

    if(guestExist === null){
      throw new AppError("The geust d'not exists", 404)

    }

    // verificar se o room existe
    const roomExist = await this.roomRepository.findById(room_id)

    if(roomExist === null){
      throw new AppError("The room d'not exists", 404)
    }

    // verificar se o room pertece ao hotel informado
    if(roomExist.hotel_id !== hotelExist.id){

      throw new AppError("the room is not from the hotel", 409)
    }

    // verificar se o room estar disponivel
    if(roomExist.status=== statusRoomEnum.OCUPADO){
      throw new AppError("the room is occupied, try another", 409)
    }

    // criar um  booking

    const booking = await this.bookingRepository.createBooking({
      start_date_booking,
      end_date_booking,
      total_price,
      hotel_id,
      guest_id,
      room_id
    })

    // mudar o room para status de ocupado
      roomExist.status = statusRoomEnum.OCUPADO;

      await this.roomRepository.saveRoom(roomExist)

    return booking
  }
}


export default CreateBookingUseCase;
