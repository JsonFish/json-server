import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import {
  CreateArticleDto,
  QueryArticleDto,
  UpdateArticleDto,
} from './dto/article.dto';
import { Article } from './entities/article.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll(query: QueryArticleDto) {
    const { page, pageSize, status, title, id, type } = query;
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
      return article ? { ...article, tags } : null;
    }
    let [articleList, total] = await this.articleRepository.findAndCount({
      where: {
        title: title ? Like(`%${title}%`) : undefined,
        status,
        type,
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

  async create(createArticleDto: CreateArticleDto) {
    const tagIds = createArticleDto.tagIds.join(',');
    const slug = await this.createSlug(
      createArticleDto.slug || createArticleDto.title,
    );
    const article = this.articleRepository.create({
      ...createArticleDto,
      tagIds,
      slug,
      type: createArticleDto.type ?? 'post',
    });
    return await this.articleRepository.save(article);
  }

  async update(updateArticleDto: UpdateArticleDto) {
    const { id } = updateArticleDto;
    const article = await this.articleRepository.findOne({
      where: { id, is_deleted: 0 },
    });
    if (!article) {
      throw new BadRequestException('文章不存在');
    }
    const tagIds = updateArticleDto.tagIds.join(',');
    const slug = updateArticleDto.slug
      ? await this.createSlug(updateArticleDto.slug, article.id)
      : article.slug;
    Object.assign(article, { ...updateArticleDto, tagIds, slug });
    return await this.articleRepository.save(article);
  }

  async updateStatus(id: number) {
    const article = await this.articleRepository.findOne({
      where: { id, is_deleted: 0 },
    });
    if (!article) {
      throw new BadRequestException('文章不存在');
    }
    const status = article.status === 1 ? 0 : 1;
    await this.articleRepository.update(id, { status });
    return;
  }

  async remove(id: number) {
    const result = await this.articleRepository.update(id, { is_deleted: 1 });
    if (result.affected === 0) {
      throw new BadRequestException('删除失败');
    }
    return;
  }

  async findPublished(type: 'post' | 'note', page: number, pageSize: number) {
    const [articleList, total] = await this.articleRepository.findAndCount({
      where: { type, status: 1, is_deleted: 0 },
      order: { isTop: 'DESC', createTime: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      articleList: await this.withTags(articleList),
      total,
      page,
      pageSize,
    };
  }

  async findPublishedBySlug(type: 'post' | 'note', slug: string) {
    const article = await this.articleRepository.findOne({
      where: { type, slug, status: 1, is_deleted: 0 },
    });
    if (!article) {
      throw new NotFoundException('文章不存在');
    }

    await this.articleRepository.increment({ id: article.id }, 'views', 1);
    const [result] = await this.withTags([
      { ...article, views: article.views + 1 },
    ]);
    return result;
  }

  private async withTags(articleList: Article[]) {
    return Promise.all(
      articleList.map(async (article) => {
        const ids = article.tagIds
          .split(',')
          .map((id) => Number(id))
          .filter((id) => Number.isInteger(id) && id > 0);
        const tags = ids.length
          ? await this.tagRepository.findBy({ id: In(ids) })
          : [];
        return { ...article, tags };
      }),
    );
  }

  private async createSlug(value: string, currentId?: number) {
    const normalized = value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const base = normalized || `article-${Date.now()}`;
    const existing = await this.articleRepository.findOne({
      where: { slug: base },
    });
    if (existing && existing.id !== currentId) {
      throw new ConflictException('文章链接已存在');
    }
    return base;
  }
}
