
import { inject, injectable } from "tsyringe";;
import AppError from "@shared/errors/AppError";
import IHotelRepository from "module/hotel/repositories/I-hotel-repository";
import IGuestRepository from "module/guest/repositories/I-guest-repository";
import IBookingRepository from "../repositories/I-booking-repository";
import IRoomRepository from "module/room/repositories/I-room-repository";
import { Booking } from "../infra/typeorm/entities/booking.entity";
import { statusRoomEnum } from "module/room/dtos/create-room-DTO";
import { string } from "zod";
import { Room } from "module/room/infra/typeorm/entities/room.entity";
import { statusBookingEnum } from "../dtos/create-booking-DTO";


interface IRequest {

 booking_id: string
 guest_id: string;

}

interface IResponse {
  status: string
  booking:Booking
}

interface IResponseValid {
  room: Room
  booking:Booking
}

@injectable()
class ManagerBookingUseCase{
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
  async cancel({
    guest_id,
    booking_id
   }:IRequest):Promise<IResponse>{


     // realizar as validações necessarias
   const { room , booking} =  await this.valid({guest_id,booking_id
    })


    if(booking.status !==  statusBookingEnum.CONFIRMADA){
      throw new AppError("A reservation can only be canceled if its status is equal to 'Confirmada'", 404)
    }
    // cancelar a reserva
    booking.status = statusBookingEnum.CANCELADA

    await this.bookingRepository.saveBooking(booking)


    // mudar o quarto para status de disponivel
    room.status = statusRoomEnum.DISPONIVEL;

    await this.roomRepository.saveRoom(room)

    return { status: "The booking successfully canceled", booking }

   }



   // realizar check-in
   async checkIn({
    guest_id,
    booking_id
   }:IRequest):Promise<IResponse>{


     // realizar as validações necessarias
   const { booking} =  await this.valid({guest_id,booking_id
    })


    if(booking.status !==  statusBookingEnum.CONFIRMADA){
      throw new AppError("To check in, the reservation needs 'Confirmada' status", 404)
    }
    // cancelar a reserva
    booking.status = statusBookingEnum.CHECK_IN

    await this.bookingRepository.saveBooking(booking)


    return { status: "Successfully Check-In", booking }

   }

   // realizar check-in
   async checkOut({
    guest_id,
    booking_id
   }:IRequest):Promise<IResponse>{


     // realizar as validações necessarias
   const { booking } =  await this.valid({guest_id,booking_id
    })

    if(booking.status !==  statusBookingEnum.CHECK_IN){
      throw new AppError("To check out, the reservation needs 'Check in' status", 404)
    }
    // cancelar a reserva
    booking.status = statusBookingEnum.CHECK_OUT

    await this.bookingRepository.saveBooking(booking)


    return { status: "Successfully Check-Out", booking }

   }


  // função de validações de class
   private async valid({
     guest_id,
     booking_id
    }:IRequest):Promise<IResponseValid>{

     // buscar o booking
    const booking = await this.bookingRepository.findById(booking_id)

    if(booking === null){
      throw new AppError("The booking d'not exists", 404)

    }

    // verificar se guest existe
    const guest = await this.guestRepository.findById(guest_id)

    if(guest === null){
      throw new AppError("The geust d'not exists", 404)

    }

    // verificar se a reserva é realmente do hospede
    if(booking.guest_id !== guest.id){
      throw new AppError("The booking is not for this guest", 404)
    }


    // buscar o quarto para mudar o status
    const room = await this.roomRepository.findById(booking.room_id)

    if(room === null){
      throw new AppError("The room d'not exists", 404)
    }


    return {booking, room}
  }
}


export default ManagerBookingUseCase;
