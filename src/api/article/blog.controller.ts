import { Controller, Get, Param, Query } from '@nestjs/common';
import { Public } from '@/core/guard/public.decorator';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { ArticleService } from './article.service';

/** Public read API consumed by the JsonFi website. */
@Public()
@Controller('blog')
export class BlogController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('posts')
  findPosts(@Query() query: PaginationDto) {
    return this.articleService.findPublished(
      'post',
      query.page,
      query.pageSize,
    );
  }

  @Get('posts/:slug')
  findPost(@Param('slug') slug: string) {
    return this.articleService.findPublishedBySlug('post', slug);
  }

  @Get('notes')
  findNotes(@Query() query: PaginationDto) {
    return this.articleService.findPublished(
      'note',
      query.page,
      query.pageSize,
    );
  }

  @Get('notes/:slug')
  findNote(@Param('slug') slug: string) {
    return this.articleService.findPublishedBySlug('note', slug);
  }
}
