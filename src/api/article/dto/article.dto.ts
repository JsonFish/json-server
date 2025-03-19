import { IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '@/common/dto/pagination.dto';

export class CreateArticleDto {
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  avatar: string;

  @MaxLength(45)
  @IsString()
  @IsNotEmpty()
  description: string;

  @MaxLength(45)
  @IsString()
  @IsNotEmpty()
  link: string;
}

export class QueryArticleFto extends PaginationDto {}
