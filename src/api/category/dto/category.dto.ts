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

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(5)
  pageSize: number = 10;
}
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

// 更新分类 DTO
export class UpdateCategoryDto extends CategoryNameDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}

// 删除分类 DTO
export class DeleteCategoriesDto {
  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  id: number[];
}
