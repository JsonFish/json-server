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
import { QueryLinkDto } from './dto/link.dto';
import { Public } from '@/core/guard/public.decorator';
@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Public()
  @Get()
  findAll(@Query() query: QueryLinkDto) {
    return this.linkService.findAll(query);
  }

  // 申请友链
  @Post()
  create(@Body() link: any, @Req() request: Request) {
    return this.linkService.applyFor(link);
  }

  // 审核友链
  @Post('agree')
  examine(@Body() body: any) {
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
