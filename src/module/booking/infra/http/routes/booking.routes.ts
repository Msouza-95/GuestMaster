
import { validateSchema } from '@shared/middleware/validation.zod';
import { Router } from 'express';;
import { BookingController } from '../controller/booking.controller';
import { CreateBookingDTO } from 'module/booking/dtos/create-booking-DTO';
import { UpdateBookingDTO } from 'module/booking/dtos/update-booking-DTO';

const bookingController = new BookingController()

const bookingRouter = Router();
// Rotas

bookingRouter.get('/',bookingController.show);
bookingRouter.get('/:booking_id',bookingController.read );
bookingRouter.post('/', validateSchema(CreateBookingDTO),bookingController.create );
bookingRouter.put('/', validateSchema(UpdateBookingDTO),bookingController.update );


export default bookingRouter
