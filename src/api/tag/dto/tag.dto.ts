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
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  tagName: string;
}

export class CreateTagDto extends TagNameDto {}

export class QueryTagDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @MaxLength(10)
  tagName: string;
}

export class UpdateTagDto extends TagNameDto {
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
