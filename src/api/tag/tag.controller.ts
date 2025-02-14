import { Controller, Get, Post, Query, Body,Request } from '@nestjs/common';
import { TagService } from './tag.service';
import { QueryTagDto, CreateTagDto } from './dto/tag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll(@Query() query: QueryTagDto) {
    console.log(query);
    return this.tagService.getTagList(query);
  }

  @Post()
  create(@Request() req, @Body() body: CreateTagDto) {
    console.log(req);
    
    console.log(body);
    return this.tagService.addTag(body);
  }
}
