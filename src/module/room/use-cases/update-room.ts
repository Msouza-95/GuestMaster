
import { inject, injectable } from "tsyringe";;
import AppError from "@shared/errors/AppError";
import IRoomRepository from "../repositories/I-room-repository";
import { Room } from "../infra/typeorm/entities/room.entity";
import IHotelRepository from "module/hotel/repositories/I-hotel-repository";
import { statusRoomEnum, typeRoomEnum } from "../dtos/create-room-DTO";


interface IRequest {
  room_number: string;
  room_type: typeRoomEnum;
  status: statusRoomEnum
  hotel_id: string
  room_id:string
}

@injectable()
class UpdateRoomUseCase{
  constructor(
    @inject('RoomRepository')
    private roomRepository: IRoomRepository,
    @inject('HotelRepository')
    private hotelRepository: IHotelRepository

  ) {}

   async execute({room_number, room_type, status,hotel_id, room_id}:IRequest):Promise<Room>{

    /*
     Verifica se room é valido
    */
    const room = await this.roomRepository.findById(room_id)

    if(room === null){
      throw new AppError("The room d'not exists", 404)

    }

    const hotel = await this.hotelRepository.findById(hotel_id)

    if(hotel === null){
      throw new AppError("The hotel d'not exists", 404)

    }


    room.hotel_id = hotel_id;
    room.room_number =room_number
    room.room_type = String(room_type)
    room.status = String(status)

    await this.roomRepository.saveRoom(room)

    return room
  }
}


export default UpdateRoomUseCase;
