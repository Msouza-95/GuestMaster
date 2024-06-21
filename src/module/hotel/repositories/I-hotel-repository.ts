import { CreateHotelDTO } from "../dtos/create-hotel-DTO";
import { Hotel } from "../infra/typeorm/entities/hotel.entity";


export default interface IHotelRepository {
  createHotel(data: CreateHotelDTO): Promise<Hotel>;
  show(): Promise<Hotel[]>;
  saveHotel(hotel: Hotel): Promise<Hotel>;
  findById(hotel_id: string): Promise<Hotel | null>;
  findByName(name: string): Promise<Hotel | null>;
}
