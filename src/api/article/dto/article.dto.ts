import {
  IsString,
  MaxLength,
  IsInt,
  IsOptional,
  IsNotEmpty,
  IsArray,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

import { PaginationDto } from '@/common/dto/pagination.dto';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  slug?: string;

  @IsOptional()
  @IsIn(['post', 'note'])
  type?: 'post' | 'note';

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  titleEn?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  descriptionEn?: string;

  @IsOptional()
  @IsString()
  contentEn?: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  tagIds: number[];

  @IsOptional()
  @IsInt()
  @IsIn([0, 1])
  isTop: number;

  @IsNotEmpty()
  @IsInt()
  @IsIn([0, 1, 2])
  status: number;
}

export class UpdateArticleDto extends CreateArticleDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}

/** PUT /article/:id 的请求体；文章 ID 从 URL 获取。 */
export class UpdateArticleByIdDto extends CreateArticleDto {}

export class UpdateArticleStatusDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @IsIn([0, 1, 2])
  status: number;
}

export class QueryArticleDto extends PaginationDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @IsIn([0, 1, 2])
  status?: number;

  @IsOptional()
  @MaxLength(200)
  @IsString()
  title?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id: number;

  @IsOptional()
  @IsIn(['post', 'note'])
  type?: 'post' | 'note';
}

export class DeleteArticleDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  id: number;
}

export class BlogQueryDto extends PaginationDto {
  /** 内容语言: zh-中文(默认) en-英文 */
  @IsOptional()
  @IsIn(['zh', 'en'])
  lang: 'zh' | 'en' = 'zh';
}
