
import { Request, Response, Router } from 'express';

import { validateSchema } from '@shared/middleware/validation.zod';
import { CreateRoomDTO } from 'module/room/dtos/create-room-DTO';
import { UpdateRoomDTO } from 'module/room/dtos/update-room-DTO';
import { RoomController } from '../controller/room.controller';
import isAuthenticated from '@module/user/infra/http/middleware/isAuthenticated';


const roomRouter = Router();
// room

const roomController = new RoomController()

roomRouter.get('/hotel/:hotel_id/:room_type',roomController.showType); // atualizar room
roomRouter.get('/hotel/:hotel_id', roomController.show ); // mostrar todos os rooms de um determinado hotel
roomRouter.get('/:room_id', roomController.read );// buscar rooom pelo id

roomRouter.use(isAuthenticated)
roomRouter.post('/',validateSchema(CreateRoomDTO), roomController.create ); // cria room
roomRouter.delete('/:room_id', roomController.delete ); // delete rom
roomRouter.put('/', validateSchema(UpdateRoomDTO) ,roomController.update); // atualizar room



export default roomRouter;
