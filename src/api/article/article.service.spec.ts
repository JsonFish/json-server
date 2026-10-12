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
    jest.clearAllMocks();

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
        order: { isTop: 'DESC', createTime: 'DESC', id: 'DESC' },
      }),
    );
    expect(result.articleList[0]).toMatchObject({
      title: 'A post',
      tags: [{ id: 1, tagName: '前端' }],
    });
  });

  it('returns the English title, description and content when lang is en', async () => {
    articleRepository.findAndCount.mockResolvedValueOnce([
      [
        {
          id: 2,
          type: 'post',
          title: '中文标题',
          titleEn: 'English title',
          description: '中文摘要',
          descriptionEn: 'English description',
          content: '中文正文',
          contentEn: 'English content',
          tagIds: '',
          status: 1,
          is_deleted: 0,
        },
      ],
      1,
    ]);

    const result = await service.findPublished('post', 1, 20, 'en');

    expect(result.articleList[0]).toMatchObject({
      title: 'English title',
      description: 'English description',
      content: 'English content',
      titleEn: 'English title',
      descriptionEn: 'English description',
      contentEn: 'English content',
    });
  });

  it('returns the English fields for an English article detail request', async () => {
    articleRepository.findOne.mockResolvedValueOnce({
      id: 3,
      type: 'note',
      slug: 'english-note',
      title: '中文标题',
      titleEn: 'English title',
      description: '中文摘要',
      descriptionEn: 'English description',
      content: '中文正文',
      contentEn: 'English content',
      views: 0,
      tagIds: '',
      status: 1,
      is_deleted: 0,
    });
    articleRepository.increment.mockResolvedValueOnce(undefined);

    const result = await service.findPublishedBySlug(
      'note',
      'english-note',
      'en',
    );

    expect(result).toMatchObject({
      title: 'English title',
      description: 'English description',
      content: 'English content',
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
