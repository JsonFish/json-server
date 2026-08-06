import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';
import { Tag } from './entities/tag.entity';

describe('ArticleService', () => {
  let service: ArticleService;
  const articleRepository = {
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    increment: jest.fn(),
  };
  const tagRepository = { findBy: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: getRepositoryToken(Article),
          useValue: articleRepository,
        },
        {
          provide: getRepositoryToken(Tag),
          useValue: tagRepository,
        },
      ],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns only published content of the requested type', async () => {
    articleRepository.findAndCount.mockResolvedValueOnce([
      [
        {
          id: 1,
          type: 'post',
          title: 'A post',
          tagIds: '1',
          status: 1,
          is_deleted: 0,
        },
      ],
      1,
    ]);
    tagRepository.findBy.mockResolvedValueOnce([{ id: 1, tagName: '前端' }]);

    const result = await service.findPublished('post', 1, 20);

    expect(articleRepository.findAndCount).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { type: 'post', status: 1, is_deleted: 0 },
      }),
    );
    expect(result.articleList[0]).toMatchObject({
      title: 'A post',
      tags: [{ id: 1, tagName: '前端' }],
    });
  });

  it('increments views when a published article is opened', async () => {
    articleRepository.findOne.mockResolvedValueOnce({
      id: 1,
      type: 'note',
      slug: 'my-note',
      views: 3,
      tagIds: '',
      status: 1,
      is_deleted: 0,
    });
    articleRepository.increment.mockResolvedValueOnce(undefined);

    const result = await service.findPublishedBySlug('note', 'my-note');

    expect(articleRepository.increment).toHaveBeenCalledWith(
      { id: 1 },
      'views',
      1,
    );
    expect(result.views).toBe(4);
    expect(result.tags).toEqual([]);
  });
});
