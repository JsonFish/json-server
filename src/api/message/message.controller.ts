import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { MessageService } from './message.service';
import { QueryMessageDto } from './dto/message.dto';
import getAgentData from '@/utils/user-agent';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async findAll(@Query() query: QueryMessageDto, @Req() request: Request) {
    const ip = request.ip;
    const userAgent = request.headers['user-agent'];
    getAgentData(userAgent ? userAgent : '');
    const { messageList, total } = await this.messageService.findAll(query);
    const formatList = messageList.map((item) => {
      item.userInfo = {
        username: item?.userInfo?.username,
        avatar: item?.userInfo?.avatar,
        email: item?.userInfo?.email,
      } as any;
      return item;
    });
    return { messageList: formatList, total };
  }

  @Post()
  create(@Body() createMessageDto: any, @Req() request: Request) {
    return this.messageService.create(createMessageDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: any) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
