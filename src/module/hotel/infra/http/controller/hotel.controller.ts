import { Request, Response } from "express";
import CreateHotelUseCase from "module/hotel/use-cases/create-hotel";
import DeleteHotelUseCase from "module/hotel/use-cases/delete-hotel";
import ShowHotelUseCase from "module/hotel/use-cases/show-hotel";
import UpdateHotelUseCase from "module/hotel/use-cases/update-hotel";


import { container } from "tsyringe";


export class HotelController{

  async create(request: Request, response: Response): Promise<Response> {

    // recupera os dados do body da rota
    const { name, address,description } = request.body;

      // resolve depedencia
    const createHotelUseCase = container.resolve(CreateHotelUseCase)

          // envia os dados para serviço de criação
    const newHotel = await createHotelUseCase.execute({
      name,
      address,
      description
    })

    return response.status(201).json({hotel: newHotel})
  }
  async show(request: Request, response: Response): Promise<Response> {


    const showHotelUseCase = container.resolve(ShowHotelUseCase)

    const hotels = await showHotelUseCase.showExecute()

    return response.status(200).json({hotels: hotels})
  }

  async read(request: Request, response: Response): Promise<Response> {
    const {hotel_id} = request.params;

    const showHotelUseCase = container.resolve(ShowHotelUseCase)

    const hotel = await showHotelUseCase.readExecute({hotel_id})


    return response.status(200).json({hotel: hotel})
  }
  async delete(request: Request, response: Response): Promise<Response> {

      const {hotel_id} = request.params;

      const deleteHotelUseCase = container.resolve(DeleteHotelUseCase)
     const result = await deleteHotelUseCase.execute({hotel_id})

    return response.status(200).json({result:result})
  }
  async update(request: Request, response: Response): Promise<Response> {
    const {
       name,
      address,
      description,
      hotel_id } = request.body;

      const updateHotelUseCase = container.resolve(UpdateHotelUseCase)
    const hotel = await updateHotelUseCase.execute({
      name,
      address,
      description,
      hotel_id
    })


    return response.status(201).json({hotel:hotel})
  }
}
