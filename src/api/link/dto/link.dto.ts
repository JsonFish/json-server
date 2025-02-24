import {
  IsString,
  IsInt,
  Min,
  IsOptional,
  MaxLength,
  IsNotEmpty,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

import { PaginationDto } from '@/common/dto/pagination.dto';

export class CreateLinkDto {
  @IsString()
  name: string;

  @IsString()
  avatarUrl: string;

  @IsString()
  description: string;

  @IsString()
  url: string;

  @IsString()
  userId: string;
}

export class QueryLinkDto extends PaginationDto {
  @Type(() => Number)
  @IsInt()
  status: number;
}

export class QueryTagDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @MaxLength(10)
  tagName: string;
}

export class UpdateTagDto extends QueryLinkDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}

export class DeleteTagsDto {
  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  id: number[];
}
