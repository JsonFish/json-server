import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import { CreateArticleDto, QueryArticleFto } from './dto/article.dto';
import { Article } from './entities/article.entity';
import { Tag } from '@/api/tag/entities/tag.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll(query: QueryArticleFto) {
    const { page, pageSize, status, title } = query;
    let [articleList, total] = await this.articleRepository.findAndCount({
      where: {
        title: title ? Like(`%${title}%`) : undefined,
        status,
        is_deleted: 0,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    articleList = await Promise.all(
      articleList.map(async (i) => {
        let tags: any;
        if (i.tagIds) {
          tags = await this.tagRepository.findBy({
            id: In(i.tagIds.split(',')),
          });
        }
        return { ...i, tags };
      }),
    );

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
