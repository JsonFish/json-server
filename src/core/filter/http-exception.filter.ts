// 异常过滤器
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    const message = Array.isArray(exceptionResponse.message)
      ? exceptionResponse.message.join(', ')
      : exceptionResponse.message;

    const requestDetails = {
      query: request.query,
      body: request.body,
      params: request.params,
      method: request.method,
      url: request.url,
      timestamp: new Date().toString(),
      ip: request.ip,
    };

    response.status(status).json({
      code: status,
      message,
      data: requestDetails,
    });
  }
}
