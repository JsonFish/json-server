import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { Public } from '@/core/guard/public.decorator';
import { AuthService } from './auth.service';

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

  @Get('refresh')
  refresh(@Req() request: AuthorizedRequest) {
    return this.authService.refreshToken(request);
  }

  @Public()
  @Post('github')
  github(@Body() body: { code: string }, @Req() request: Request) {
    return this.authService.loginByGithub(body, request.ip);
  }
}
