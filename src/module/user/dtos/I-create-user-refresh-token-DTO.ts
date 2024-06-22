interface ICreateUserRefreshTokenDTO {
  refresh_token: string;
  expires_date: Date;
  user_id: string;
}

export default ICreateUserRefreshTokenDTO;
