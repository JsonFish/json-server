import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import * as nanoid from 'nanoid';
import { UserService } from '../user/user.service';
import secretKey from '@/config/jwt.config';
import { AuthorizedRequest } from './auth.controller';
import githubConfig from '@/config/github.config';
import getIpAddress from '@/utils/ip-address';

@Injectable()
export class AuthService {
  constructor(
    private JwtService: JwtService,
    private UserService: UserService,
  ) {}

  async refreshToken(request: AuthorizedRequest) {
    const { id, username } = request.user;
    return await this.generateToken(id, username);
  }

  async loginByGithub(body: { code: string }, ip: string | undefined) {
    const { code } = body;
    if (!code) throw new BadRequestException('登录失败，请稍后再试');
    // 获取 access_token
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: githubConfig.client_id,
        client_secret: githubConfig.client_secret,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    if (response?.data?.access_token) {
      const userInfo = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${response?.data?.access_token}`,
        },
      });
      if (userInfo.data.id) {
        const ipData = await getIpAddress(ip);
        const githubUserInfo = {
          avatar: userInfo.data.avatar_url,
          username: userInfo.data.name,
          email: userInfo.data.email,
          ip: ipData.ip,
          ipAddress: ipData.province,
          githubId: userInfo.data.id,
        };
        const result = await this.UserService.findAll({
          githubId: userInfo.data.id,
        });
        if (result.length !== 0) {
          const id = result[0].id;
          const role = result[0].role;
          const avatar = result[0].avatar;
          // 更新用户基本信息
          await this.UserService.updateUser({ ...githubUserInfo, id, role });
          // 更新登录埋点信息
          await this.UserService.updateLoginInfo(
            id,
            ipData.ip,
            ipData.province,
          );
          const { accessToken, refreshToken } = await this.generateToken(
            id,
            result[0].username,
          );
          return {
            avatar,
            username: result[0].username,
            accessToken,
            refreshToken,
          };
        } else {
          // 新用户注册（仅第三方登录）
          const id = nanoid.customAlphabet('1234567890', 10)();
          await this.UserService.addUserByGithub({
            ...githubUserInfo,
            id,
            lastLoginTime: new Date(),
            lastLoginIp: ipData.ip,
            lastLoginAddress: ipData.province,
            loginCount: 1,
          });
          const { accessToken, refreshToken } = await this.generateToken(
            id,
            githubUserInfo.username,
          );
          return {
            avatar: githubUserInfo.avatar,
            username: githubUserInfo.username,
            accessToken,
            refreshToken,
          };
        }
      } else {
        throw new BadRequestException('获取用户信息失败');
      }
    } else {
      throw new BadRequestException(response.data.error);
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
