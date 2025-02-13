import { Controller, Get, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { QueryTagDto } from './dto/tag.dto';
// import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll(@Query() QueryTagDto: QueryTagDto) {
    return this.tagService.getTagList(QueryTagDto);
  }
}
