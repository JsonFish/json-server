export class ResponseDto<T> {
  code: number;
  message: string;
  data: T;

  static success<T>(data: T, message = 'sucess'): ResponseDto<T> {
    return {
      code: 200,
      data,
      message,
    };
  }

  static error(message = 'error', code = 400): ResponseDto<null> {
    return {
      code,
      data: null,
      message,
    };
  }
}
