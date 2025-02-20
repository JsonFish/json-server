import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const errorMessage = exception.message;

    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    // 获取 HTTP 状态码，若无法获取则默认设置为 INTERNAL_SERVER_ERROR
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      code: httpStatus,
      message: errorMessage,
      data: {
        query: request.query,
        body: request.body,
        params: request.params,
        method: request.method,
        url: request.url,
        ip: request.ip,
      },
    };

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
