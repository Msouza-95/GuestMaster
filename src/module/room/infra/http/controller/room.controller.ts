import { Request, Response } from "express";
import ShowRoomUseCase from "module/room/use-cases/show-room";
import CreateRoomUseCase from "module/room/use-cases/create-room";
import DeleteRoomUseCase from "module/room/use-cases/delete-room";
import UpdateRoomUseCase from "module/room/use-cases/update-room";

import { container } from "tsyringe";


export class RoomController{

  async create(request: Request, response: Response): Promise<Response> {

    // recupera os dados do body da rota
    const { room_number, room_type, hotel_id } = request.body;

      // resolve depedencia
    const createRoomUseCase = container.resolve(CreateRoomUseCase)

          // envia os dados para serviço de criação
    const newRoom = await createRoomUseCase.execute({room_number, room_type, hotel_id})

    return response.status(201).json({room: newRoom})
  }
  async show(request: Request, response: Response): Promise<Response> {

    const {hotel_id} = request.params;

    const showRoomUseCase = container.resolve(ShowRoomUseCase)

    const rooms = await showRoomUseCase.showExecute(hotel_id)

    return response.status(200).json({rooms: rooms})
  }
  async showType(request: Request, response: Response): Promise<Response> {

    const {hotel_id, room_type} = request.params;

    const showRoomUseCase = container.resolve(ShowRoomUseCase)

    const rooms = await showRoomUseCase.typeExecute({hotel_id, room_type})

    return response.status(200).json({rooms: rooms})
  }
  async read(request: Request, response: Response): Promise<Response> {
    const {room_id} = request.params;

    const isuuud =  isUuid(room_id)

      if(!isuuud){
        throw new AppError("Invalid id, needs type uuid", 400)
      }

    const showRoomUseCase = container.resolve(ShowRoomUseCase)

    const room = await showRoomUseCase.readExecute(room_id)


    return response.status(200).json({room: room})
  }
  async delete(request: Request, response: Response): Promise<Response> {

      const {room_id} = request.params;

      const deleteRoomUseCase = container.resolve(DeleteRoomUseCase)
     const result = await deleteRoomUseCase.execute({room_id})

    return response.status(200).json({result:result})
  }
  async update(request: Request, response: Response): Promise<Response> {
    const { room_number, room_type, status, hotel_id , room_id} = request.body;

      const updateRoomUseCase = container.resolve(UpdateRoomUseCase)
    const rooms = await updateRoomUseCase.execute({
      room_number,
      room_type,
      status,
      hotel_id,
      room_id
    })


    return response.status(201).json({rooms:rooms})
  }
}
