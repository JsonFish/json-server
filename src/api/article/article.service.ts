import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import { CreateArticleDto, QueryArticleDto } from './dto/article.dto';
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

  async findAll(query: QueryArticleDto) {
    const { page, pageSize, status, title, id } = query;
    if (id) {
      const article = await this.articleRepository.findOne({
        where: { id, is_deleted: 0 },
      });
      let tags: any = [];
      if (article?.tagIds) {
        tags = await this.tagRepository.findBy({
          id: In(article.tagIds.split(',')),
        });
      }
      return { ...article, tags };
    }
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

  async remove(id: number) {
    const result = await this.articleRepository.update(id, { is_deleted: 1 });
    if (result.affected === 0) {
      throw new BadRequestException('删除失败');
    }
    return;
  }
}
