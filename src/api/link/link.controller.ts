import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { Link } from './entities/link.entity';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}
  // 获取审核通过的
  @Get('approved')
  findApproved(@Query() query: any) {
    return this.linkService.findApproved(query);
  }

  // 获取未审核的
  @Get('unaudited')
  findUnaudited(@Query() query: any) {
    return this.linkService.findUnaudited(query);
  }

  // 申请友链
  @Post()
  create(@Body() link: any) {
    return this.linkService.applyFor(link);
  }

  // 审核友链
  @Post('agree')
  examine(@Body() body: any) {
    return this.linkService.examine(body);
  }

  // 修改
  @Put()
  update(@Param('id') id: string, @Body() link: Link) {
    return this.linkService.update(+id, link);
  }

  // 删除
  @Delete()
  remove(@Param('id') id: string) {
    return this.linkService.remove(+id);
  }
}
