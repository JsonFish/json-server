import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nanoid from 'nanoid';
import * as bcrypt from 'bcrypt';
import { AddUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import userConfig from '@/config/user.config';
import getIpAddress from '@/utils/ip-address';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(Query: any) {
    const { email, id } = Query;
    return await this.usersRepository.find({ where: { email, id } });
  }

  findOne(email: string) {
    return `This action returns a #${email} user`;
  }

  async addUser(userInfo: AddUserDto, requestIp: string | undefined) {
    const { email, password } = userInfo;
    const id = nanoid.customAlphabet('1234567890', 10)();
    const username = email.split('@')[0];
    const bcryptPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    let ip_address = '';
    let formatIp = '';
    if (requestIp) {
      const { ip, province } = await getIpAddress(requestIp);
      formatIp = ip;
      ip_address = province ? province : '';
    }
    const userInfoData = {
      id,
      username,
      email,
      password: bcryptPassword,
      avatar: userConfig.defaultAvatar,
      ip: formatIp,
      ip_address,
    };
    await this.usersRepository.save(userInfoData);
    return userInfoData;
  }
}
