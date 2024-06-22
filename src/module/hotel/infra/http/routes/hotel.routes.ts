
import { validateSchema } from '@shared/middleware/validation.zod';
import { Router } from 'express';
import {  HotelController } from '../controller/hotel.controller';
import { UpdateHotelDTO } from 'module/hotel/dtos/update-hotel-DTO';
import { CreateHotelDTO } from 'module/hotel/dtos/create-hotel-DTO';
import isAuthenticated from '@module/user/infra/http/middleware/isAuthenticated';

const hotelController = new HotelController()

const hotelRouter = Router();
// Rotas

hotelRouter.get('/',hotelController.show);
hotelRouter.get('/:hotel_id',hotelController.read );

hotelRouter.use(isAuthenticated)
hotelRouter.post('/', validateSchema(CreateHotelDTO),hotelController.create );
hotelRouter.put('/', validateSchema(UpdateHotelDTO),hotelController.update );
hotelRouter.delete('/:hotel_id',hotelController.delete );


export default hotelRouter
