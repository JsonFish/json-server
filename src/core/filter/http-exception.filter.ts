import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse = exception.getResponse();

    let message = exception.message;
    let errors = null;

    if (exception instanceof BadRequestException && exceptionResponse instanceof Object) {
      const responseObject = exceptionResponse as any;
      if (responseObject.message && Array.isArray(responseObject.message)) {
        errors = responseObject.message.map((error: ValidationError) => ({
          field: error.property,
          errors: error.constraints ? Object.values(error.constraints) : ['未知错误'],
        }));
        message = 'Validation failed';
      }
    }

    response.status(status).json({
      code: status,
      message: message,
      errors: errors,
      error: exception.name,
    });
  }
}