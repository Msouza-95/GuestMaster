
import { Request, Response, Router } from 'express';
import { RoomControler } from '../controller/room.controller';
import { validateSchema } from '@shared/middleware/validation.zod';
import { CreateRoomDTO } from 'module/room/dtos/create-room-DTO';


const usersRouter = Router();
// Rotas

const roomControler = new RoomControler()

usersRouter.post('/',validateSchema(CreateRoomDTO), roomControler.create );

usersRouter.get('/', roomControler.show );


export default usersRouter;
