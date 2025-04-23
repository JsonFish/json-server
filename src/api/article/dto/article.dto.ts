import { IsString, MaxLength, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '@/common/dto/pagination.dto';

export class CreateArticleDto {}

export class QueryArticleFto extends PaginationDto {
  @IsInt()
  @Type(() => Number)
  status: number = 0;

  @MaxLength(45)
  @IsString()
  title: string = '';
}
