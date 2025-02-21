import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as captchapng from 'captchapng';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './entities/auth.entity';
import { LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private JwtService: JwtService,
  ) {}

  getCaptcha(session: Record<string, any>) {
    const code = Math.floor(Math.random() * (9999 - 999 + 1) + 999); //生成随机4位数
    session.captchaCode = code;
    const png = new captchapng(120, 45, code); // width,height,numeric captcha
    png.color(255, 255, 255, 0);
    png.color(104, 105, 109);
    return { imageBase64: png.getBase64() };
  }

  async login(loginDto: LoginDto, session: Record<string, any>) {
    if (loginDto.code != session.code) {
      // throw Error('验证码错误');
    }
    // todo: 判断是否注册

    const token = await this.JwtService.signAsync(
      { ...loginDto },
      { expiresIn: '15m' },
    );
    return { token };
  }
}
