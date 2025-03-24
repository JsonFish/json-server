import { IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '@/common/dto/pagination.dto';

export class CreateArticleDto {}

export class QueryArticleFto extends PaginationDto {}
