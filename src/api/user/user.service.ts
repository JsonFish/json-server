import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from './entities/user.entity';
import { QueryUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(query: { email?: string; id?: string; githubId?: string }) {
    const { email, id, githubId } = query;
    return await this.usersRepository.find({
      where: { email, id, githubId },
    });
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
    return { userList, total };
  }

  async addUserByGithub(userInfo: Partial<User>) {
    await this.usersRepository.save(userInfo);
    return;
  }

  async updateUser(body: UpdateUserDto) {
    const { id } = body;
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    Object.assign(user, { ...body, id });
    await this.usersRepository.save(user);
    return;
  }

  /**
   * 更新用户登录埋点信息
   */
  async updateLoginInfo(id: string, ip: string, ipAddress: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    user.lastLoginTime = new Date();
    user.lastLoginIp = ip;
    user.lastLoginAddress = ipAddress;
    user.loginCount = (user.loginCount || 0) + 1;
    await this.usersRepository.save(user);
    return;
  }
}
