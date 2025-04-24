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
  UpdateLinkDto,
} from './dto/link.dto';
import { Public } from '@/core/guard/public.decorator';

export interface RequestType extends Request {
  user: {
    id: number;
  };
}

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}
  @Public()
  @Get()
  findAll(@Query() query: QueryLinkDto) {
    return this.linkService.findAll(query);
  }

  @Post()
  create(@Body() link: CreateLinkDto, @Req() request: RequestType) {
    return this.linkService.applyFor(link, request.user.id);
  }

  @Post('agree')
  examine(@Body() body: ExamineLinkDto) {
    return this.linkService.examine(body);
  }

  @Put()
  update(@Body() link: UpdateLinkDto) {
    return this.linkService.update(link);
  }

  @Delete()
  remove(@Body() body: DeleteLinksDto) {
    return this.linkService.remove(body.id);
  }
}
