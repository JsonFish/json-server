import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
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

  update(updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
  }

  remove(id: number[]) {
    return this.usersRepository.delete(id);
  }
}
