import { CreateGuestDTO } from "../dtos/create-guest-DTO";
import { Guest } from "../infra/typeorm/entities/guest.entity";



export default interface IGuestRepository {
  createGuest(data: CreateGuestDTO): Promise<Guest>;
  show(): Promise<Guest[]>;
  saveGuest(guest: Guest): Promise<Guest>;
  findById(guest_id: string): Promise<Guest| null>;
  findByEmail(name: string): Promise<Guest| null>;
}
