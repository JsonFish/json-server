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
  @MaxLength(20)
  name: string;

  @IsString()
  @MaxLength(255)
  avatarUrl: string;

  @IsString()
  @MaxLength(45)
  description: string;

  @IsString()
  @MaxLength(45)
  url: string;
}

export class QueryLinkDto extends PaginationDto {
  @Type(() => Number)
  @IsInt()
  status: number;
}

export class ExamineLinkDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
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
