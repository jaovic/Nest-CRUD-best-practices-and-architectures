import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, NotFoundException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { IErrorResponse } from '../../app.structures';
import { ErrorCodes } from '../errors/codes';

@Catch(NotFoundException)
export class NotFoundErrorFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const responseBody = {
      error: {
        status: true,
        messages: ['The requested resource was not found.'],
        code: ErrorCodes.NOT_FOUND_ERROR,
      },
    } as IErrorResponse;

    httpAdapter.reply(ctx.getResponse(), responseBody, exception.getStatus());
  }
}
