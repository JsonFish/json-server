import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nanoid from 'nanoid';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { AddUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import userConfig from '@/config/user.config';

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

  async addUser(userInfo: AddUserDto, ip: string | undefined) {
    const { email, password } = userInfo;
    const id = nanoid.customAlphabet('1234567890', 10)();
    const username = email.split('@')[0];
    const bcryptPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    let ip_address = '-';
    if (ip) {
      const res = await axios.get(`http://ip-api.com/json/${ip}?lang=zh-CN`);
      if (res.data.status == 'success')
        ip_address = `${res.data.country}-${res.data.regionName}-${res.data.city}`;
    }

    await this.usersRepository.save({
      id,
      username,
      email,
      password: bcryptPassword,
      avatar: userConfig.defaultAvatar,
      ip,
      ip_address,
    });
    return;
  }
}
