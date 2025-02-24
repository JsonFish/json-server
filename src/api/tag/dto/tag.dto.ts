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
export class TagNameDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  tagName: string;
}

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(5)
  pageSize: number = 10;
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
