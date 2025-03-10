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
  create(createMessageDto: any) {
    return 'This action adds a new message';
  }

  async findAll(query: QueryMessageDto) {
    const { page, pageSize } = query;
    const [messageList, total] = await this.messsageRepository.findAndCount({
      relations: ['user'],
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { messageList, total };
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: any) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
