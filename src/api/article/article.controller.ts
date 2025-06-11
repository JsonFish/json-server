import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { Public } from '@/core/guard/public.decorator';
import { ArticleService } from './article.service';
import {
  CreateArticleDto,
  UpdateArticleDto,
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

  @Delete()
  remove(@Body() data: DeleteArticleDto) {
    return this.articleService.remove(data.id);
  }
}
