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
import { LoginDto } from './dto/auth.dto';

export interface AuthorizedRequest extends Request {
  user: {
    id: string;
    email: string;
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
  async login(
    @Body() loginDto: LoginDto,
    @Session() session: Record<string, any>,
  ) {
    if (loginDto.code != session.captchaCode) {
      throw new BadRequestException('验证码错误');
    }
    return await this.authService.login(loginDto);
  }

  @Get('refresh')
  refresh(@Req() request: AuthorizedRequest) {
    return this.authService.refreshToken(request);
  }

  @Public()
  @Post('register')
  register(@Body() createAuthDto: LoginDto) {}

  @Public()
  @Post('email')
  email(@Body() createAuthDto: LoginDto) {}

  @Post('github')
  github(@Body() createAuthDto: LoginDto) {}
}
