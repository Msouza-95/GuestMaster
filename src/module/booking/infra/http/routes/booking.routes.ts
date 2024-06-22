
import { validateSchema } from '@shared/middleware/validation.zod';
import { Router } from 'express';;
import { BookingController } from '../controller/booking.controller';
import { CreateBookingDTO } from 'module/booking/dtos/create-booking-DTO';
import { CheckBookingDTO } from 'module/booking/dtos/check-booking-DTO';
import isAuthenticated from '@module/user/infra/http/middleware/isAuthenticated';

const bookingController = new BookingController()

const bookingRouter = Router();
// Rotas


bookingRouter.get('/guest/:guest_id',bookingController.show );
bookingRouter.get('/report/',bookingController.report );

bookingRouter.use(isAuthenticated)

bookingRouter.post('/', validateSchema(CreateBookingDTO),bookingController.create );

bookingRouter.post('/cancel', validateSchema(CheckBookingDTO),bookingController.cancel );

bookingRouter.post('/checkout', validateSchema(CheckBookingDTO),bookingController.checkOut );

bookingRouter.post('/checkin', validateSchema(CheckBookingDTO),bookingController.checkIn );




export default bookingRouter
