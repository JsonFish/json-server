import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { LinkService } from './link.service';
import { QueryLinkDto, CreateLinkDto, ExamineLinkDto } from './dto/link.dto';

export interface RequestType extends Request {
  user: {
    id: string;
  };
}
@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get()
  findAll(@Query() query: QueryLinkDto, @Req() request: Request) {
    return this.linkService.findAll(query);
  }

  // 申请友链
  @Post()
  create(@Body() link: CreateLinkDto, @Req() request: RequestType) {
    return this.linkService.applyFor(link, request.user.id);
  }

  // 审核友链
  @Post('agree')
  examine(@Body() body: ExamineLinkDto) {
    return this.linkService.examine(body);
  }

  // 修改
  @Put()
  update(@Param('id') id: string, @Body() link: any) {
    return this.linkService.update(+id, link);
  }

  // 删除
  @Delete()
  remove(@Param('id') id: string) {
    return this.linkService.remove(+id);
  }
}
