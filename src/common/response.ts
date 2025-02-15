export class Response<T> {
  code: number;
  message: string;
  data?: T;

  static success<T>(data?: T, message = 'sucess'): Response<T> {
    return {
      code: 200,
      data: data as T,
      message,
    };
  }

  static error(message = 'error', code = 400): Response<undefined> {
    return {
      code,
      message,
    };
  }
}
