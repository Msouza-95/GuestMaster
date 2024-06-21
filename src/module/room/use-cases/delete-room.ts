
import { inject, injectable } from "tsyringe";;
import AppError from "@shared/errors/AppError";
import IRoomRepository from "../repositories/I-room-repository";
import { Room } from "../infra/typeorm/entities/room.entity";
import IHotelRepository from "module/hotel/repositories/I-hotel-repository";
import { statusRoomEnum, typeRoomEnum } from "../dtos/create-room-DTO";
import { DeleteResult } from "typeorm";


interface IRequest {
  room_id: string
}
interface IResponse {
  room_id: string
  status: string
}

@injectable()
class DeleteRoomUseCase{
  constructor(
    @inject('RoomRepository')
    private roomRepository: IRoomRepository,

  ) {}

   async execute({room_id}:IRequest):Promise<DeleteResult>{

    const result = await this.roomRepository.deleteRoom(room_id)

   return result
   }
}


export default DeleteRoomUseCase;
