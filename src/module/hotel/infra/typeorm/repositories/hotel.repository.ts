import { Repository } from "typeorm";
import { AppDataSource } from "@shared/infra/typeorm/dataSource";
import IUserRepository from "module/user/repositories/I-user-repository";import { Hotel } from "../entities/hotel.entity";
import IHotelRepository from "module/hotel/repositories/I-hotel-repository";
import { CreateHotelDTO } from "module/hotel/dtos/create-hotel-DTO";
Hotel


class HotelRepository extends Repository<Hotel>  implements IHotelRepository{
  constructor() {
      super(Hotel, AppDataSource.manager);
  }

  //  cria e salva um user no banco
  public async createHotel(data: CreateHotelDTO): Promise<Hotel>{

    const hotel = this.create(data)

    await this.save(hotel)

    return hotel

  }

  // salva um user no banco
  public async saveHotel(hotel: Hotel): Promise<Hotel> {

    const updateHotel = await this.save(hotel)

    return updateHotel
  }


  // retorna todos os usuairos
  public async show(): Promise<Hotel[]> {
    const hotels = await this.find()

    return hotels
  }

  // buscar user pelo id
  public async findById(user_id: string): Promise<Hotel | null> {
    const hotel =await this.findOneBy({id: user_id})

    return hotel
  }
// buscar user pelo email
  public async findByName(name: string): Promise<Hotel | null> {
      return await this.findOneBy({ name });
  }
}

export default HotelRepository
