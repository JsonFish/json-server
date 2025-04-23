import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { Public } from '@/core/guard/public.decorator';
import { ArticleService } from './article.service';
import { CreateArticleDto, QueryArticleFto } from './dto/article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Public()
  @Get('all')
  findAll(@Query() query: QueryArticleFto) {
    return this.articleService.findAll(query);
  }

  @Public()
  @Get()
  findOne(@Query('id', ParseIntPipe) id: number) {
    return this.articleService.findOne(id);
  }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: any) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
