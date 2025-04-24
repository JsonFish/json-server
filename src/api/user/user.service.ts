import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import * as nanoid from 'nanoid';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import userConfig from '@/config/user.config';
import getIpAddress from '@/utils/ip-address';
import {
  QueryUserDto,
  UpdateUserDto,
  AddUserDto,
  ShieldUserDto,
} from './dto/user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(query: { email?: string; id?: string }) {
    const { email, id } = query;
    return await this.usersRepository.find({ where: { email, id } });
  }

  async getUserList({ page, pageSize, username, email }: QueryUserDto) {
    const [userList, total] = await this.usersRepository.findAndCount({
      where: {
        username: username ? Like(`%${username}%`) : undefined,
        email: email ? Like(`%${email}%`) : undefined,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { create_time: 'ASC' },
    });
    const usersWithoutPassword = userList.map(({ password, ...rest }) => rest);
    return { userList: usersWithoutPassword, total };
  }

  async addUser(userInfo: AddUserDto, requestIp: string | undefined) {
    const { email, password } = userInfo;
    const id = nanoid.customAlphabet('1234567890', 10)();
    const username = email.split('@')[0];
    const bcryptPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const { ip, province } = await getIpAddress(requestIp);
    const formatIp = ip;
    const ip_address = province;

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

  async updateUser(body: UpdateUserDto) {
    const { id } = body;
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    Object.assign(user, { ...body, id: +id });
    await this.usersRepository.save(user);
    return;
  }

  async shieldUser(body: ShieldUserDto) {
    const { id } = body;
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    user.status = user.status === 1 ? 0 : 1;
    await this.usersRepository.save(user);
    return;
  }
}
