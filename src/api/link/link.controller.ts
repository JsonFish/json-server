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
import {
  QueryLinkDto,
  CreateLinkDto,
  ExamineLinkDto,
  DeleteLinksDto,
} from './dto/link.dto';
export interface RequestType extends Request {
  user: {
    id: number;
  };
}
import { Public } from '@/core/guard/public.decorator';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get()
  findAll(@Query() query: QueryLinkDto) {
    return this.linkService.findAll(query);
  }

  @Public()
  @Post()
  create(@Body() link: CreateLinkDto, @Req() request: RequestType) {
    return this.linkService.applyFor(link, request?.user?.id);
  }

  @Post('agree')
  examine(@Body() body: ExamineLinkDto) {
    return this.linkService.examine(body);
  }

  @Put()
  update(@Param('id') id: string, @Body() link: any) {
    return this.linkService.update(+id, link);
  }

  @Delete()
  remove(@Body() body: DeleteLinksDto) {
    return this.linkService.remove(body.id);
  }
}
