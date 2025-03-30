import { IsString, MaxLength, IsNotEmpty, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '@/common/dto/pagination.dto';

export class CreateArticleDto {}

export class QueryArticleFto extends PaginationDto {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  status: number;

  @MaxLength(45)
  @IsString()
  title: string;
}
