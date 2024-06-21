
import { inject, injectable } from "tsyringe";;
import { DeleteResult } from "typeorm";
import IHotelRepository from "../repositories/I-hotel-repository";


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

   async execute({hotel_id}:IRequest):Promise<DeleteResult>{

    const result = await this.hotelRepository.deleteHotel(hotel_id)

   return result
   }
}


export default DeleteHotelUseCase;
