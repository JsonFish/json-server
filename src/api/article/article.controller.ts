import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto, QueryArticleFto } from './dto/article.dto';
import { Public } from '@/core/guard/public.decorator';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Public()
  @Get()
  findAll(@Query() query: QueryArticleFto) {
    return this.articleService.findAll(query);
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
