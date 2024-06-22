
import { Request, Response } from 'express';
import CreateSessionService from 'module/user/use-cases/authenticate-user';

import { container } from 'tsyringe';



export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = container.resolve(CreateSessionService);

    const { user, refresh_token } =
      await createSession.execute({
        email,
        password,
      });

    return response.json(
    { user, refresh_token }
    );
  }


}
