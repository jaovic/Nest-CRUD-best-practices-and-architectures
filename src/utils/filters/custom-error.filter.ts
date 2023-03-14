import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { IErrorResponse } from '../../app.structures';
import { CustomError } from '../errors/custom.error';

@Catch(CustomError)
export class CustomErrorFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: CustomError<any>, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    console.log(new Date().toISOString(), exception);

    const message = exception.message;
    const code = exception.code;

    const responseBody = {
      error: {
        status: true,
        messages: Array.isArray(message) ? message : [message],
        code,
      },
    } as IErrorResponse;

    httpAdapter.reply(ctx.getResponse(), responseBody, exception.httpStatusCode);
  }
}
