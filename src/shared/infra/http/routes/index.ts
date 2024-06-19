import usersRouter from '@modules/user/infra/http/routes/users.routes';
import { Router } from 'express';


const routes = Router();

// arquivo geral de import da rotas

routes.use('/users', usersRouter);



export default routes;
