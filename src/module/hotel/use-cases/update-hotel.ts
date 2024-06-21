
import { inject, injectable } from "tsyringe";;
import AppError from "@shared/errors/AppError";
import IHotelRepository from "module/hotel/repositories/I-hotel-repository";
import { Hotel } from "../infra/typeorm/entities/hotel.entity";


interface IRequest {
  name: string;
  address: string;
  description: string
  hotel_id: string
}

@injectable()
class UpdateHotelUseCase{
  constructor(
    @inject('HotelRepository')
    private hotelRepository: IHotelRepository

  ) {}

   async execute({
    hotel_id,
    description,
    address,
    name
  }:IRequest):Promise<Hotel>{

    /*
     Verifica se hotel é valido
    */
    const hotel = await this.hotelRepository.findById(hotel_id)

    if(hotel === null){
      throw new AppError("The hotel d'not exists", 404)

    }

    hotel.name =name;
    hotel.description = description;
    hotel.address =address;


    await this.hotelRepository.saveHotel(hotel)

    return hotel
  }
}


export default UpdateHotelUseCase;
