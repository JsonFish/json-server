import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import type { IResult } from 'ua-parser-js';
import { QueryMessageDto, createMessageDto } from './dto/message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { IpData } from '@/utils/ip-address';
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

  async create(
    messageData: createMessageDto,
    data: IResult,
    ipData: IpData,
    userId: number,
  ) {
    const newMessage = this.messsageRepository.create({
      text: messageData.text,
      userId,
      browserName: data.browser.name,
      browserVersion: data.browser.version,
      osName: data.os.name,
      osVersion: data.os.version,
      ip: ipData.ip,
      ipAddress: ipData.province,
    });
    await this.messsageRepository.save(newMessage);
    return;
  }

  async approval(id: number) {
    const result = await this.messsageRepository.update(id, { status: 1 });
    if (result.affected === 0) {
      throw new BadRequestException('操作失败');
    }
    return;
  }

  remove(id: number) {
    return;
  }
}
