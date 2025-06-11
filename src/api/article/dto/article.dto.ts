import {
  IsString,
  MaxLength,
  IsInt,
  IsOptional,
  IsNotEmpty,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '@/common/dto/pagination.dto';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

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
  @IsInt()
  @Type(() => Number)
  status: number = 0;

  @MaxLength(45)
  @IsString()
  title: string = '';

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id: number;
}

export class DeleteArticleDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  id: number;
}
