import AppError from "@shared/errors/AppError";
import { Request, Response } from "express";
import CreateGuestUseCase from "module/guest/use-cases/create-guest";
import DeleteGuestUseCase from "module/guest/use-cases/delete-guest";
import ShowGuestUseCase from "module/guest/use-cases/show-guest";
import UpdateGuestUseCase from "module/guest/use-cases/update-guest";

import { container } from "tsyringe";
import { isUuid } from "uuidv4";


export class GuestController{

  async create(request: Request, response: Response): Promise<Response> {


    const {
      fullname,
      email,
      phone,
      birthdayDate,
      city,
      state,
      country } = request.body;

      // resolve depedencia
    const createGuestUseCase = container.resolve(CreateGuestUseCase)

          // envia os dados para serviço de criação
    const newguest = await createGuestUseCase.execute({
    fullname,
    email,
    phone,
    birthdayDate,
    city,
    state,
    country
    })

    return response.status(201).json({guest: newguest})
  }
  async show(request: Request, response: Response): Promise<Response> {


    const showGuestUseCase = container.resolve(ShowGuestUseCase)

    const guests = await showGuestUseCase.showExecute()

    return response.status(200).json({guests: guests})
  }

  async read(request: Request, response: Response): Promise<Response> {
    const {guest_id} = request.params;

      const isuuud =  isUuid(guest_id)

      if(!isuuud){
        throw new AppError("Invalid id, needs type uuid", 400)
      }

    const showGuestUseCase = container.resolve(ShowGuestUseCase)

    const guest = await showGuestUseCase.readExecute({guest_id})


    return response.status(200).json({guest: guest})
  }
  async delete(request: Request, response: Response): Promise<Response> {

      const {guest_id} = request.params;

      const deleteGuestUseCase = container.resolve(DeleteGuestUseCase)
     const result = await deleteGuestUseCase.execute({guest_id})

    return response.status(200).json({result:result})
  }
  async update(request: Request, response: Response): Promise<Response> {
    const {
        fullname,
        email,
        phone,
        birthdayDate,
        city,
        state,
        country,
        guest_id
      } = request.body;

      const updateGuestUseCase = container.resolve(UpdateGuestUseCase)
    const guest = await updateGuestUseCase.execute({
      fullname,
      email,
      phone,
      birthdayDate: new Date(birthdayDate),
      city,
      state,
      country,
      guest_id
    })


    return response.status(201).json({guest:guest})
  }
}
