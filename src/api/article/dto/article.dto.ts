import {
  IsString,
  MaxLength,
  IsInt,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '@/common/dto/pagination.dto';

export class CreateArticleDto {}

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
