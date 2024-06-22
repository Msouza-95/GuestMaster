import { Request, Response } from "express";
import CreateBookingUseCase from "module/booking/use-cases/create-booking";
import CreateHotelUseCase from "module/hotel/use-cases/create-hotel";
import ShowHotelUseCase from "module/hotel/use-cases/show-hotel";
import UpdateHotelUseCase from "module/hotel/use-cases/update-hotel";


import { container } from "tsyringe";


export class BookingController{

  async create(request: Request, response: Response): Promise<Response> {

    // recupera os dados do body da rota
    const {
        start_date_booking,
        end_date_booking,
        status,
        total_price,
        hotel_id,
        guest_id,
        room_id
      } = request.body;

      // resolve depedencia
    const createBookingUseCase = container.resolve(CreateBookingUseCase)

          // envia os dados para serviço de criação
    const newBooking = await createBookingUseCase.execute({
      start_date_booking,
      end_date_booking,
      total_price,
      hotel_id,
      guest_id,
      room_id
    })

    return response.status(201).json({booking: newBooking})
  }
  async show(request: Request, response: Response): Promise<Response> {


    const showHotelUseCase = container.resolve(ShowHotelUseCase)
    const rooms = await showHotelUseCase.showExecute()

    return response.status(200).json({rooms: rooms})
  }

  async read(request: Request, response: Response): Promise<Response> {
    const {hotel_id} = request.params;

    const showHotelUseCase = container.resolve(ShowHotelUseCase)

    const hotel = await showHotelUseCase.readExecute({hotel_id})


    return response.status(200).json({hotel: hotel})
  }
  async update(request: Request, response: Response): Promise<Response> {
    const {
       name,
      address,
      description,
      hotel_id } = request.body;

      const updateHotelUseCase = container.resolve(UpdateHotelUseCase)
    const rooms = await updateHotelUseCase.execute({
      name,
      address,
      description,
      hotel_id
    })


    return response.status(201).json({rooms:rooms})
  }
}
