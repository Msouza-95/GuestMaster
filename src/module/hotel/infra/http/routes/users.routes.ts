
import { Request, Response, Router } from 'express';


const usersRouter = Router();
// Rotas

usersRouter.get('/teste', (request: Request, response: Response)=>{
  return response.json({teste:  "teste"})

});


export default usersRouter;
