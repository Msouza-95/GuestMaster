
import { Router } from 'express';
import { UserControler } from '../controllers/user.controller';


import { validateSchema } from '@shared/middleware/validation.zod';
import { CreateUserDTO } from 'module/user/dtos/create-user-DTO';




const usersRouter = Router();
// Rotas

const userControler = new UserControler()

usersRouter.post('/', validateSchema(CreateUserDTO)
,userControler.create);


export default usersRouter;
