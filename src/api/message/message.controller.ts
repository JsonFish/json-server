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
import { QueryMessageDto, createMessageDto } from './dto/message.dto';
import getAgentData from '@/utils/user-agent';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  findAll(@Query() query: QueryMessageDto) {
    return this.messageService.findAll(query);
  }

  @Post()
  create(@Body() createMessageDto: createMessageDto, @Req() request: Request) {
    const ip = request.ip;
    const userAgent = request.headers['user-agent'];
    const data = getAgentData(userAgent ? userAgent : '');
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
