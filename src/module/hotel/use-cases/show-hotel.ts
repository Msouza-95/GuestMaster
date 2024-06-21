
import { inject, injectable } from "tsyringe";;
import AppError from "@shared/errors/AppError";
import IHotelRepository from "module/hotel/repositories/I-hotel-repository";
import { Hotel } from "../infra/typeorm/entities/hotel.entity";



interface IRequest {
  hotel_id: string;
}

@injectable()
class ShowHotelUseCase{
  constructor(
    @inject('HotelRepository')
    private hotelRepository: IHotelRepository,
  ) {}


  /*retornas todos os hotels*/
   async showExecute():Promise<Hotel[]>{


    const hotels = await this.hotelRepository.show()

    return hotels
  }

  /* retorna um hotel pelo id*/
   async readExecute({hotel_id}:IRequest):Promise<Hotel>{


    const hotel = await this.hotelRepository.findById(hotel_id!)


    if(hotel === null){
      throw new AppError("The hotel d'not exists", 404)

    }

    return hotel
  }

}


export default ShowHotelUseCase;
