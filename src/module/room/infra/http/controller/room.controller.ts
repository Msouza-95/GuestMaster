import { Request, Response } from "express";
import CreateRoomUseCase from "module/room/use-cases/create-room-user";

import { container } from "tsyringe";





export class RoomControler{

  async create(request: Request, response: Response): Promise<Response> {

    // recupera os dados do body da rota
    const { room_number, room_type, status, hotel_id } = request.body;

      // resolve depedencia
    const createRoomUseCase = container.resolve(CreateRoomUseCase)


      // envia os dados para serviço de criação
    const newRoom = await createRoomUseCase.execute({room_number, room_type, status, hotel_id})

    return response.status(201).json({room: newRoom})
  }
  async show(request: Request, response: Response): Promise<Response> {




    return response.status(201).json({rooms: []})
  }
}
