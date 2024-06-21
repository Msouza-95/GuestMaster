
import { inject, injectable } from "tsyringe";;
import AppError from "@shared/errors/AppError";
import IRoomRepository from "../repositories/I-room-repository";
import { Room } from "../infra/typeorm/entities/room.entity";
import IHotelRepository from "module/hotel/repositories/I-hotel-repository";



interface IRequest {
  hotel_id: string;
  room_type: string;
}

@injectable()
class ShowRoomUseCase{
  constructor(
    @inject('RoomRepository')
    private roomRepository: IRoomRepository,
    @inject('HotelRepository')
    private hotelRepository: IHotelRepository,
  ) {}


  /*retornas dos quartos de um hotel*/
   async showExecute(hotel_id:string):Promise<Room[]>{

     // Verifica se hotel é valido
    const hotelExist = await this.hotelRepository.findById(hotel_id!)

    if(hotelExist === null){
      throw new AppError("The hotel d'not exists", 404)

    }

    const rooms = await this.roomRepository.findByHotelID(hotel_id!)

    return rooms
  }

  /* retorna um quarto pelo id*/
   async readExecute(room_id:string):Promise<Room>{


    const room = await this.roomRepository.findById(room_id!)


    if(room === null){
      throw new AppError("The room_id d'not exists", 404)

    }

    return room
  }

  async typeExecute({hotel_id, room_type}:IRequest):Promise<Room[]>{

    const hotelExist = await this.hotelRepository.findById(hotel_id!)

    if(hotelExist === null){
      throw new AppError("The hotel d'not exists", 404)

    }

    const rooms = await this.roomRepository.findByType({hotel_id,room_type})

   return rooms

 }
}


export default ShowRoomUseCase;
