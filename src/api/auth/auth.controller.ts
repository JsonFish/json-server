import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Request } from 'express';

import { AuthService } from './auth.service';

import { Public } from '@/core/guard/public.decorator';
import { AUTH_THROTTLE_LIMIT, THROTTLE_TTL } from '@/config/throttle.config';

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
  @Throttle({ default: { limit: AUTH_THROTTLE_LIMIT, ttl: THROTTLE_TTL } })
  @Post('github')
  github(@Body() body: { code: string }, @Req() request: Request) {
    return this.authService.loginByGithub(body, request.ip);
  }
}
