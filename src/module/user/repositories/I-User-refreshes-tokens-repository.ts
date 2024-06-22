import ICreateUserRefreshTokenDTO from "../dtos/I-create-user-refresh-token-DTO";
import UserRefreshToken from "../infra/typeorm/entities/user-refresh-token.entity";


interface IUsersRefreshesTokensRepository {
  createToken({
    refresh_token,
    user_id,
    expires_date,
  }: ICreateUserRefreshTokenDTO): Promise<UserRefreshToken>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserRefreshToken | null>;
  findByRefreshToken(
    refresh_token: string,
  ): Promise<UserRefreshToken | null>;
  deleteById(id: string): Promise<void>;
}

export default IUsersRefreshesTokensRepository;
