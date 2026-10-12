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
  tagIds: number[];

  @IsOptional()
  @IsInt()
  isTop: number;

  @IsNotEmpty()
  @IsInt()
  status: number;
}

export class UpdateArticleDto extends CreateArticleDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
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
