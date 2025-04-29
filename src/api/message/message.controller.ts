import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Query,
  Delete,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { MessageService } from './message.service';
import { QueryMessageDto, createMessageDto } from './dto/message.dto';
import getAgentData from '@/utils/user-agent';
import { Public } from '@/core/guard/public.decorator';
import getIpAddress from '@/utils/ip-address';
export interface AuthorizedRequest extends Request {
  user: {
    id: string;
    email: string;
    username: string;
  };
}

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Public()
  @Get()
  findAll(@Query() query: QueryMessageDto) {
    return this.messageService.findAll(query);
  }

  @Post()
  async create(
    @Body() createMessageDto: createMessageDto,
    @Req() request: AuthorizedRequest,
  ) {
    const userAgent = request.headers['user-agent'];
    const agentData = getAgentData(userAgent ? userAgent : '');
    const requestIp = request.ip;
    const ipData = await getIpAddress(requestIp);
    const { id } = request.user;
    return this.messageService.create(createMessageDto, agentData, ipData, +id);
  }

  @Put()
  approval(@Query('id') id: string) {
    return this.messageService.approval(+id);
  }

  @Delete()
  remove(@Body('id') id: string) {
    return this.messageService.remove(+id);
  }
}
