import usersRouter from 'module/user/infra/http/routes/users.routes';
import { Router } from 'express';
import roomRouter from 'module/room/infra/http/routes/room.routes';
import hotelRouter from 'module/hotel/infra/http/routes/hotel.routes';


const routes = Router();

// arquivo geral de import da rotas

routes.use('/users', usersRouter);
routes.use('/rooms', roomRouter);
routes.use('/hotels', hotelRouter);



export default routes;
