
import { Router } from 'express';
import SessionsController from '../controllers/sessions.controller';
import { validateSchema } from '@shared/middleware/validation.zod';
import { SessionUserDTO } from 'module/user/dtos/session-user-DTO ';



const sessionsRouter = Router();

const sessionsController = new SessionsController();




sessionsRouter.post(
  '/',
  validateSchema(SessionUserDTO),
  sessionsController.create,
);



export default sessionsRouter;
