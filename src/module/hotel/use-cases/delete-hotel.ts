
import { inject, injectable } from "tsyringe";;
import { DeleteResult } from "typeorm";
import IHotelRepository from "../repositories/I-hotel-repository";
import AppError from "@shared/errors/AppError";


interface IRequest {
  hotel_id: string
}
interface IResponse {
  hotel_id: string
  status: string
}

@injectable()
class DeleteHotelUseCase{
  constructor(
    @inject('HotelRepository')
    private hotelRepository: IHotelRepository,

  ) {}

   async execute({hotel_id}:IRequest):Promise<IResponse>{

    let result
    try {

      result = await this.hotelRepository.deleteHotel(hotel_id)
    }
    catch(err){
      throw new AppError("A hotel can only be deleted when it has no room", 404)
    }



    if(result.affected === 0) {
      throw new AppError("The room d'not exists", 404)
    }

   return { hotel_id, status: "successfully deleted"}


   }
}


export default DeleteHotelUseCase;
