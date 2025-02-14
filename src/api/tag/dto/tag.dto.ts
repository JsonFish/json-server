import {
  IsString,
  IsInt,
  Min,
  IsOptional,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTagDto {
  @MaxLength(15, { message: '标签名最大长度为15' })
  @IsString({ message: '标签名必须为字符串' })
  @IsNotEmpty({ message: '标签名不能为空' })
  tagName: string;
}

export class QueryTagDto {
  @MaxLength(15, { message: '标签名最大长度为15' })
  @IsString({ message: '标签名必须为字符串' })
  @IsOptional() // 可选参数
  tagName: string;

  @IsOptional()
  @Type(() => Number) // 添加类型转换
  @Min(1, { message: 'currentPage 最小值为 1' })
  @IsInt({ message: 'currentPage 必须是整数' })
  currentPage: number = 1;

  @IsOptional()
  @Type(() => Number) // 添加类型转换
  @Min(10, { message: 'pageSize 最小值为 10' })
  @IsInt({ message: 'pageSize 必须是整数' })
  pageSize: number = 10;
}

export class UpdateTagDto extends CreateTagDto {
  @IsInt()
  @IsNotEmpty({ message: 'id不能为空' })
  id: number;
}

export class DeleteTagsDto {
  @IsInt({ each: true, message: '标签ID必须是数字' })
  @IsNotEmpty({ message: 'ids不能为空' })
  id: number[];
}
