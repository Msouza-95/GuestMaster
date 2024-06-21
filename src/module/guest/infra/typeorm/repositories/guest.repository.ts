import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/typeorm/dataSource";
import IUserRepository from "module/user/repositories/I-user-repository";
import { Guest } from "../entities/guest.entity";
import IGuestRepository from "module/guest/repositories/I-guest-repository";
import { CreateGuestDTO } from "module/guest/dtos/create-guest-DTO";






class GuestRepository extends Repository<Guest>  implements IGuestRepository{
  constructor() {
      super(Guest, AppDataSource.manager);
  }

  //  cria e salva um user no banco
  public async createGuest(data: CreateGuestDTO): Promise<Guest>{

    const guest = this.create(data)

    await this.save(guest)

    return guest

  }

  // salva um user no banco
  public async saveGuest(guest: Guest): Promise<Guest> {

    const updateGuest = await this.save(guest)

    return updateGuest
  }


  // retorna todos os usuairos
  public async show(): Promise<Guest[]> {
    const guests = await this.find()

    return guests
  }

  // buscar user pelo id
  public async findById(Guest_id: string): Promise<Guest | null> {
    const guest =await this.findOneBy({id: Guest_id})

    return guest
  }


  public async findByEmail(email: string): Promise<Guest | null> {
    const guest =await this.findOneBy({email})

    return guest
  }


}

export default GuestRepository
