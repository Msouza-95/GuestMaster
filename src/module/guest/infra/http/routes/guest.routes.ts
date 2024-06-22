
import { validateSchema } from '@shared/middleware/validation.zod';
import { Router } from 'express';
import { GuestController } from '../controller/guest.controller';
import { UpdateGuestDTO } from 'module/guest/dtos/update-guest-DTO';
import { CreateGuestDTO } from 'module/guest/dtos/create-guest-DTO';
import isAuthenticated from '@module/user/infra/http/middleware/isAuthenticated';

const guestController = new GuestController()

const guestRouter = Router();
// Rotas

guestRouter.get('/',guestController.show);
guestRouter.get('/:guest_id',guestController.read );

guestRouter.use(isAuthenticated)
guestRouter.post('/', validateSchema(CreateGuestDTO),guestController.create );
guestRouter.put('/', validateSchema(UpdateGuestDTO),guestController.update );
guestRouter.delete('/:guest_id',guestController.delete );


export default guestRouter
