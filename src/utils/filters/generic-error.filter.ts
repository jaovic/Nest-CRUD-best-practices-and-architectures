import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { IErrorResponse } from '../../app.structures';
import { ErrorCodes } from '../errors/codes';

@Catch()
export class GenericErrorFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const responseBody = {
      error: {
        status: true,
        messages: ['An internal error has occurred, please try again later.'],
        code: ErrorCodes.INTERNAL_ERROR,
      },
    } as IErrorResponse;

    httpAdapter.reply(ctx.getResponse(), responseBody, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
