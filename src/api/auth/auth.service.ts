import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as captchapng from 'captchapng';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/auth.dto';
import secretKey from '@/config/jwt.config';
import { AuthorizedRequest } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(
    private JwtService: JwtService,
    private UserService: UserService,
  ) {}

  getCaptcha(session: Record<string, any>) {
    const code = Math.floor(Math.random() * (9999 - 999 + 1) + 999);
    session.captchaCode = code;

    const png = new captchapng(120, 45, code);
    png.color(255, 255, 255, 0);
    png.color(104, 105, 109);
    return { imageBase64: png.getBase64() };
  }

  async login(loginDto: LoginDto) {
    const res = await this.UserService.findAll(loginDto);
    if (res.length == 0) {
      throw new BadRequestException('账号未注册');
    }

    const { id, username, avatar, password } = res[0];
    const compareResult = bcrypt.compareSync(loginDto.password, password);
    if (!compareResult) {
      throw new BadRequestException('密码错误');
    }

    const { accessToken, refreshToken } = await this.generateToken(id);
    return { username, avatar, accessToken, refreshToken };
  }

  async refreshToken(request: AuthorizedRequest) {
    const { id } = request.user;
    return await this.generateToken(id);
  }

  private async generateToken(id: string | number) {
    const accessToken = await this.JwtService.signAsync(
      { id },
      { expiresIn: '1h', secret: secretKey.accessSecretKey },
    );
    const refreshToken = this.JwtService.sign(
      { id },
      { expiresIn: '1d', secret: secretKey.refreshSecretKey },
    );
    return { accessToken, refreshToken };
  }
}
