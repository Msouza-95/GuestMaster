import { addDays } from 'date-fns';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

import IUsersRefreshesTokensRepository from '../repositories/I-User-refreshes-tokens-repository';
import { compare } from 'bcryptjs';

import { User } from '../infra/typeorm/entities/user.entity';
import IUserRepository from '../repositories/I-user-repository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  //: string;
  refresh_token: string;
}

@injectable()
export default class CreateSessionService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UsersRefreshesTokensRepository')
    private usersRefreshesTokensRepository: IUsersRefreshesTokensRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {

    const user = await this.userRepository.findByEmail(email);

    if (user ===null) {
      throw new AppError('Email or password invalid');
    }

    const passwordMatch = await  compare(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new AppError('Email or password invalid');
    }

    // const token = sign({}, authConfig.jwt.secret, {
    //   subject: user.id,
    //   expiresIn: authConfig.jwt.expiresIn,
    // });

    const refreshToken = sign({ email }, authConfig.jwt.secret_refresh_token, {
      subject: user.id,
      expiresIn: authConfig.jwt.expires_in_refresh_token,
    });

    const refreshTokenExpiresDate = addDays(
      new Date(),
      authConfig.jwt.expires_refresh_token_days,
    );

    await this.usersRefreshesTokensRepository.createToken({
      refresh_token: refreshToken,
      user_id: user.id,
      expires_date: refreshTokenExpiresDate,
    });


    return { user, refresh_token: refreshToken };
  }
}
