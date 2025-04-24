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
import {
  CreateArticleDto,
  QueryArticleDto,
  DeleteArticleDto,
} from './dto/article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Public()
  @Get()
  findAll(@Query() query: QueryArticleDto) {
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

  @Delete()
  remove(@Body() data: DeleteArticleDto) {
    return this.articleService.remove(data.id);
  }
}
