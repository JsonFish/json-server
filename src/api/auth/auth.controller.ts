import { Controller, Get, Post, Body, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, UpdateAuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('captcha')
  getCaptcha(@Session() session: Record<string, any>) {
    return this.authService.getCaptcha(session);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto, @Session() session: Record<string, any>) {
    return this.authService.login(loginDto, session);
  }

  @Post('register')
  register(@Body() createAuthDto: LoginDto) {
    // return this.authService.create(createAuthDto);
  }

  @Post('email')
  email(@Body() createAuthDto: LoginDto) {
    // return this.authService.create(createAuthDto);
  }

  @Post('github')
  github(@Body() createAuthDto: LoginDto) {
    // return this.authService.create(createAuthDto);
  }

  @Post('refresh')
  refresh(@Body() createAuthDto: LoginDto) {
    // return this.authService.create(LoginDto);
  }
}
