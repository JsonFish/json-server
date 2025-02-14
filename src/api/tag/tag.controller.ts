import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { TagService } from './tag.service';
import {
  QueryTagDto,
  CreateTagDto,
  UpdateTagDto,
  DeleteTagsDto,
} from './dto/tag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll(@Query() query: QueryTagDto) {
    return this.tagService.getTag(query);
  }

  @Post()
  create(@Body() body: CreateTagDto) {
    return this.tagService.addTag(body);
  }

  @Put()
  update(@Body() body: UpdateTagDto) {
    return this.tagService.updateTag(body);
  }

  @Delete()
  delete(@Body() body: DeleteTagsDto) {
    return this.tagService.deleteTags(body.id);
  }
}
