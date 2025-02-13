import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { TagService } from './tag.service';
import { QueryTagDto, TagNameDto } from './dto/tag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll(@Query() query: QueryTagDto) {
    return this.tagService.getTagList(query);
  }

  @Post()
  create(@Body() body: TagNameDto) {
    return this.tagService.addTag(body);
  }
}
