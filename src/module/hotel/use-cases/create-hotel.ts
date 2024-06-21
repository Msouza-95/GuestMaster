
import { inject, injectable } from "tsyringe";;
import AppError from "@shared/errors/AppError";
import IHotelRepository from "module/hotel/repositories/I-hotel-repository";
import { Hotel } from "../infra/typeorm/entities/hotel.entity";
;


interface IRequest {
  name: string;
  address: string;
  description: string
}

@injectable()
class CreateHotelUseCase{
  constructor(
    @inject('HotelRepository')
    private hotelRepository: IHotelRepository,

  ) {}

   async execute({name, address, description}:IRequest):Promise<Hotel>{

    /*
     Verifica se hotel já foi cadastrado
    */
    const hotelExist = await this.hotelRepository.findByName(name)

    if(hotelExist){
      throw new AppError('Conflict, user already exists', 409)

    }


    // criar um  novo hotel

    const hotel = await this.hotelRepository.createHotel({name, description,address})

    return hotel
  }
}


export default CreateHotelUseCase;
