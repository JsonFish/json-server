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
export class CategoryNameDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  categoryName: string;
}

export class CreateCategoryDto extends CategoryNameDto {}

export class QueryCategoryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @MaxLength(10)
  categoryName?: string;
}
export class UpdateCategoryDto extends CategoryNameDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
export class DeleteCategoriesDto {
  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  id: number[];
}
