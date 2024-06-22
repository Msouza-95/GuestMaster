import { Repository} from 'typeorm';
import UserRefreshToken from '../entities/user-refresh-token.entity';

import { AppDataSource } from '@shared/infra/typeorm/dataSource';
import ICreateUserRefreshTokenDTO from 'module/user/dtos/I-create-user-refresh-token-DTO';
import IUsersRefreshesTokensRepository from 'module/user/repositories/I-User-refreshes-tokens-repository';



class UsersRefreshesTokensRepository extends Repository<UserRefreshToken>
  implements IUsersRefreshesTokensRepository
{

  constructor() {
    super(UserRefreshToken, AppDataSource.manager);
  }

  public async createToken({
    refresh_token,
    user_id,
    expires_date,
  }: ICreateUserRefreshTokenDTO): Promise<UserRefreshToken> {
    const userRefreshToken = this.create({
      refresh_token,
      user_id,
      expires_date,
    });

    await this.save(userRefreshToken);

    return userRefreshToken;
  }

  public async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserRefreshToken | null> {
    return this.findOne({ where: { user_id, refresh_token } });
  }

  public async findByRefreshToken(
    refresh_token: string,
  ): Promise<UserRefreshToken | null> {
    return this.findOne({ where: { refresh_token } });
  }

  public async deleteById(id: string): Promise<void> {
    await this.delete(id);
  }
}

export default UsersRefreshesTokensRepository;
