import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto, QueryArticleFto } from './dto/article.dto';

import { Article } from './entities/article.entity';
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async findAll(query: QueryArticleFto) {
    const { page, pageSize } = query;
    const [articleList, total] = await this.articleRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { articleList, total };
  }

  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  update(id: number, updateArticleDto: any) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
