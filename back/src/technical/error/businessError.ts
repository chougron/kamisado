export class BusinessError extends Error {
  public readonly httpCode: number;

  constructor(message: string, httpError: number = 400) {
    super(message);
    this.httpCode = httpError;
  }
}
