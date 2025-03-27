import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QueryMessageDto, createMessageDto } from './dto/message.dto';
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
      const { userInfo, ...rest } = item;
      return {
        ...rest,
        username: userInfo.username,
        avatar: userInfo.avatar,
        email: userInfo.email,
      };
    });
    return { messageList: formatList, total };
  }

  create(createMessageDto: createMessageDto) {}

  update(id: number, updateMessageDto: any) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
