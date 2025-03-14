import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as captchapng from 'captchapng';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import * as nanoid from 'nanoid';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { UserService } from '../user/user.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import secretKey from '@/config/jwt.config';
import { AuthorizedRequest } from './auth.controller';
import emailConfig, { mailOptions } from '@/config/email.config';
import { EmailCode } from './entities/email-code.entity';
import githubConfig from '@/config/github.config';

@Injectable()
export class AuthService {
  private transporter: Transporter;
  constructor(
    @InjectRepository(EmailCode)
    private readonly EmailCodeRepository: Repository<EmailCode>,
    private JwtService: JwtService,
    private UserService: UserService,
  ) {}

  getCaptcha(session: Record<string, any>) {
    const code = nanoid.customAlphabet('1234567890', 4)();
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
    const { accessToken, refreshToken } = await this.generateToken(
      id,
      username,
    );
    return { username, avatar, accessToken, refreshToken };
  }

  async sendEmail(email: string) {
    const res = await this.UserService.findAll({ email });
    if (res.length != 0) {
      throw new BadRequestException('该邮箱已注册');
    }
    this.transporter = nodemailer.createTransport(emailConfig);
    const verifyCode = nanoid.customAlphabet('1234567890', 6)();
    try {
      await this.transporter.sendMail(mailOptions(email, verifyCode));
    } catch {
      throw new BadRequestException('验证码发送失败，请稍后再试');
    }
    await this.EmailCodeRepository.save({ email, code: verifyCode });
    return;
  }

  async register(RegisterDto: RegisterDto, ip: string | undefined) {
    const res = await this.UserService.findAll(RegisterDto);
    if (res.length != 0) {
      throw new BadRequestException('该邮箱已注册');
    }
    const { email, password, code } = RegisterDto;
    const result = await this.EmailCodeRepository.findOne({
      where: { email },
      order: { send_time: 'DESC' },
    });
    if (!result || result.code !== code) {
      throw new BadRequestException('验证码错误');
    }
    const timeDifference =
      (new Date().getTime() - new Date(result.send_time).getTime()) / 1000 / 60;
    if (timeDifference > 5) {
      throw new BadRequestException('验证码已过期');
    }
    const { id, username, avatar } = await this.UserService.addUser(
      { email, password },
      ip,
    );
    const { accessToken, refreshToken } = await this.generateToken(
      id,
      username,
    );
    return { username, avatar, accessToken, refreshToken };
  }

  async refreshToken(request: AuthorizedRequest) {
    const { id, username } = request.user;
    return await this.generateToken(id, username);
  }

  async loginByGithub(body: any) {
    const { code } = body;
    if (!code) throw new BadRequestException('登录失败，请稍后再试');
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: githubConfig.client_id,
        client_secret: githubConfig.client_secret,
        code,
      },
    );
    if (response?.data?.access_token) {
    }
  }

  private async generateToken(id: string | number, username: string) {
    const accessToken = await this.JwtService.signAsync(
      { id, username },
      { expiresIn: '1h', secret: secretKey.accessSecretKey },
    );
    const refreshToken = this.JwtService.sign(
      { id, username },
      { expiresIn: '1d', secret: secretKey.refreshSecretKey },
    );
    return { accessToken, refreshToken };
  }
}
