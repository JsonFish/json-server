export default class Response<T> {
  code: number;
  message: string;
  data?: T;

  constructor(code: number, message: string, data?: T) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  static success<T>(data?: T, message = 'success'): Response<T> {
    return new Response(200, message, data);
  }

  static error(message = 'error', code = 400): Response<undefined> {
    return new Response(code, message);
  }
}
