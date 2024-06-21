
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
}

@injectable()
class CreateRoomUseCase{
  constructor(
    @inject('RoomRepository')
    private roomRepository: IRoomRepository,
    @inject('HotelRepository')
    private hotelRepository: IHotelRepository,

  ) {}

   async execute({room_number, room_type, status,hotel_id}:IRequest):Promise<Room>{

    /*
     Verifica se hotel é valido
    */
    const hotelExist = await this.hotelRepository.findById(hotel_id)

    if(hotelExist === null){
      throw new AppError("The hotel d'not exists", 404)

    }


    // criar um  novo quarto em um hotel

    const room = await this.roomRepository.createRoom({room_number,room_type,status,hotel_id})

    return room
  }
}


export default CreateRoomUseCase;
