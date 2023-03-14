export class CustomError<T> extends Error {
  public code: T;
  public httpStatusCode: number;

  constructor(message?: string, code?: T, httpStatusCode = 400) {
    super(message);
    this.code = code;
    this.httpStatusCode = httpStatusCode;
  }

  getError<TypeCodeError>(message: string, code: TypeCodeError, Status = 400) {
    return new CustomError(message, code, Status);
  }
}

export const getClassError = new CustomError().getError;
