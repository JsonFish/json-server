import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { ArticleService } from './article.service';
import { Public } from '../../core/guard/public.decorator';
import {
  CreateArticleDto,
  UpdateArticleDto,
  QueryArticleDto,
  DeleteArticleDto,
  UpdateArticleByIdDto,
  UpdateArticleStatusDto,
} from './dto/article.dto';

@Controller('article')
@Public()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  findAll(@Query() query: QueryArticleDto) {
    return this.articleService.findAll(query);
  }

  @Get('tags')
  findTags() {
    return this.articleService.findTags();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.findOne(id);
  }

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    return await this.articleService.create(createArticleDto);
  }

  @Put('status')
  async updateStatus(@Body() data: DeleteArticleDto) {
    return await this.articleService.updateStatus(data.id);
  }

  @Put()
  async update(@Body() updateArticleDto: UpdateArticleDto) {
    return await this.articleService.update(updateArticleDto);
  }

  @Put(':id')
  updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleByIdDto,
  ) {
    return this.articleService.update({ ...updateArticleDto, id });
  }

  @Put(':id/status')
  updateStatusById(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateArticleStatusDto,
  ) {
    return this.articleService.setStatus(id, data.status);
  }

  @Delete()
  remove(@Body() data: DeleteArticleDto) {
    return this.articleService.remove(data.id);
  }

  @Delete(':id')
  removeById(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.remove(id);
  }
}
