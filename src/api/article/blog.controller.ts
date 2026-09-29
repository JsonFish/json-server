import { Controller, Get, Param, Query } from '@nestjs/common';

import { BlogQueryDto } from './dto/article.dto';
import { ArticleService } from './article.service';

import { Public } from '@/core/guard/public.decorator';

/** Public read API consumed by the JsonFi website. */
@Public()
@Controller('blog')
export class BlogController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('posts')
  findPosts(@Query() query: BlogQueryDto) {
    return this.articleService.findPublished(
      'post',
      query.page,
      query.pageSize,
      query.lang,
    );
  }

  @Get('posts/:slug')
  findPost(@Param('slug') slug: string, @Query() query: BlogQueryDto) {
    return this.articleService.findPublishedBySlug('post', slug, query.lang);
  }

  @Get('notes')
  findNotes(@Query() query: BlogQueryDto) {
    return this.articleService.findPublished(
      'note',
      query.page,
      query.pageSize,
      query.lang,
    );
  }

  @Get('notes/:slug')
  findNote(@Param('slug') slug: string, @Query() query: BlogQueryDto) {
    return this.articleService.findPublishedBySlug('note', slug, query.lang);
  }
}
