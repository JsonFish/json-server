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
import { UAParser } from 'ua-parser-js';
import { MessageService } from './message.service';
import { QueryMessageDto } from './dto/message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() createMessageDto: any) {
    return this.messageService.create(createMessageDto);
  }

  @Get()
  findAll(@Query() query: QueryMessageDto, @Req() request: Request) {
    const ip = request.ip;
    const userAgent = request.headers['user-agent'];
    if (userAgent) {
      const parser = new UAParser();
      const result = parser.setUA(userAgent).getResult();
      console.log(ip);
      console.log(result);
    }

    return this.messageService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: any) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
  private getBrowserInfo(userAgent: string): string {
    // 简单的浏览器信息解析示例
    if (userAgent.includes('Chrome')) {
      return 'Chrome';
    } else if (userAgent.includes('Firefox')) {
      return 'Firefox';
    } else if (userAgent.includes('Safari')) {
      return 'Safari';
    }
    return '未知浏览器';
  }

  private getOSInfo(userAgent: string): string {
    // 简单的操作系统信息解析示例
    if (userAgent.includes('Windows')) {
      return 'Windows';
    } else if (userAgent.includes('Mac OS')) {
      return 'Mac OS';
    } else if (userAgent.includes('Linux')) {
      return 'Linux';
    }
    return '未知操作系统';
  }
}
