import { Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { QueryMessageDto } from './dto/message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messsageRepository: Repository<Message>,
  ) {}

  async findAll(query: QueryMessageDto) {
    const { page, pageSize, status } = query;
    const [messageList, total] = await this.messsageRepository.findAndCount({
      where: { status },
      relations: ['userInfo'],
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { createTime: 'DESC' },
    });
    const formatList = messageList.map((item) => {
      item = {
        ...item,
        username: item.userInfo.username,
        avatar: item.userInfo.avatar,
        email: item.userInfo.email,
      } as any;
      return item;
    });
    return { messageList: formatList, total };
  }

  create(createMessageDto: any) {
    return 'This action adds a new message';
  }

  update(id: number, updateMessageDto: any) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
