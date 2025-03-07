import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Session,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { Public } from '@/core/guard/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, EmailDto } from './dto/auth.dto';

export interface AuthorizedRequest extends Request {
  user: {
    id: string;
    email: string;
    username: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('captcha')
  getCaptcha(@Session() session: Record<string, any>) {
    return this.authService.getCaptcha(session);
  }

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto, @Session() session: Record<string, any>) {
    if (loginDto.code != session.captchaCode) {
      throw new BadRequestException('验证码错误');
    }
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('register')
  register(@Body() RegisterDto: RegisterDto, @Req() request: Request) {
    return this.authService.register(RegisterDto, request.ip);
  }

  @Get('refresh')
  refresh(@Req() request: AuthorizedRequest) {
    return this.authService.refreshToken(request);
  }

  @Public()
  @Post('email')
  email(@Body() EmailDto: EmailDto) {
    const email = EmailDto.email;
    return this.authService.sendEmail(email);
  }

  @Public()
  @Post('github')
  github(@Body() body: any) {
    return this.authService.loginByGithub(body);
  }
}
