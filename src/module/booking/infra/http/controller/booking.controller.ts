import { Request, Response } from "express";
import CreateBookingUseCase from "module/booking/use-cases/create-booking";
import CreateHotelUseCase from "module/hotel/use-cases/create-hotel";
import ShowHotelUseCase from "module/hotel/use-cases/show-hotel";
import UpdateHotelUseCase from "module/hotel/use-cases/update-hotel";


import { container } from "tsyringe";
import { Booking } from "../../typeorm/entities/booking.entity";
import ManagerBookingUseCase from "module/booking/use-cases/manager-booking";
import ShowBookingUseCase from "module/booking/use-cases/show-booking";
import ReportBookingUseCase from "module/booking/use-cases/report-booking";


export class BookingController{

  async create(request: Request, response: Response): Promise<Response> {

    // recupera os dados do body da rota
    const {
        start_date_booking,
        end_date_booking,
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
  async report(request: Request, response: Response): Promise<Response> {
    const start_date = request.query.startDate as string
    const end_date = request.query.endDate as string

    if (!start_date || !end_date) {
      return response.status(400).send({ error: "start_date and end_date are required" });
  }

    const reportBookingUseCase = container.resolve(ReportBookingUseCase)

    const bookings = await reportBookingUseCase.execute({
      start_date,
      end_date,
    })


    return response.status(200).json({bookings: bookings})
  }
  async show(request: Request, response: Response): Promise<Response> {
    const {guest_id} = request.params;

    const showBookingUseCase = container.resolve(ShowBookingUseCase)

    const guests = await showBookingUseCase.execute({guest_id})


    return response.status(200).json({guests: guests})
  }
  async checkIn(request: Request, response: Response): Promise<Response> {
    const {
      guest_id,
      booking_id
    } = request.body;

      const managerBookingUseCase = container.resolve(ManagerBookingUseCase)
    const result = await managerBookingUseCase.checkIn({
      guest_id,
      booking_id
    })


    return response.status(200).json({result})
  }
  async cancel(request: Request, response: Response): Promise<Response> {

    const {
      guest_id,
      booking_id
    } = request.body;

      const managerBookingUseCase = container.resolve(ManagerBookingUseCase)


      const result = await managerBookingUseCase.cancel({
        guest_id,
        booking_id
      })


    return response.status(200).json({result})
  }
  async checkOut(request: Request, response: Response): Promise<Response> {
    const {
      guest_id,
      booking_id
    } = request.body;

      const managerBookingUseCase = container.resolve(ManagerBookingUseCase)


      const result = await managerBookingUseCase.checkOut({
        guest_id,
        booking_id
      })


    return response.status(200).json({result})
  }
}
