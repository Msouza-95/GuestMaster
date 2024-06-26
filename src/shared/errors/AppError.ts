

/*
@ classe para modelagem de tratamento de erros
*/
export default class AppError {
  public readonly statusCode: number;
  public readonly message: string;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
