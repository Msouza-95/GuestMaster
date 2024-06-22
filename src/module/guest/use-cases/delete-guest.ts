
import { inject, injectable } from "tsyringe";;
import { DeleteResult } from "typeorm";
import IGuestRepository from "../repositories/I-guest-repository";
import AppError from "@shared/errors/AppError";


interface IRequest {
  guest_id: string
}
interface IResponse {
  guest_id: string
  status: string
}

@injectable()
class DeleteGuestUseCase{
  constructor(
    @inject('GuestRepository')
    private guestRepository: IGuestRepository,

  ) {}

   async execute({guest_id}:IRequest):Promise<IResponse>{

    const result = await this.guestRepository.deleteGuest(guest_id)

    if(result.affected === 0) {
      throw new AppError("The guest d'not exists", 404)
    }

   return { guest_id, status: "successfully deleted"}
   }
}


export default DeleteGuestUseCase;
