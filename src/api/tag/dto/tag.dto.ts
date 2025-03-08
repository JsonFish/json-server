import {
  IsString,
  IsInt,
  IsOptional,
  MaxLength,
  IsNotEmpty,
  IsArray,
} from 'class-validator';
import { PaginationDto } from '@/common/dto/pagination.dto';

export class TagNameDto {
  @MaxLength(10)
  @IsString()
  @IsNotEmpty()
  tagName: string;
}

export class CreateTagDto extends TagNameDto {}

export class QueryTagDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @MaxLength(10)
  tagName?: string;
}

export class UpdateTagDto extends TagNameDto {
  @IsInt()
  @IsNotEmpty()
  id: number;
}

export class DeleteTagsDto {
  @IsInt({ each: true })
  @IsArray()
  @IsNotEmpty()
  id: number[];
}
