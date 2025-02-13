import {
  IsString,
  IsInt,
  Min,
  IsOptional,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TagNameDto {
  @IsString({ message: '标签名必须为字符串' })
  @IsNotEmpty({ message: '标签名不能为空' })
  @MaxLength(20, { message: '标签名最大长度为20' })
  tagName: string;
}

export class QueryTagDto extends TagNameDto {
  @IsOptional() // 可选参数
  tagName: string;

  @IsOptional()
  @Type(() => Number) // 添加类型转换
  @IsInt({ message: 'currentPage 必须是整数' })
  @Min(1, { message: 'currentPage 最小值为 1' })
  currentPage: number = 1;

  @IsOptional()
  @Type(() => Number) // 添加类型转换
  @IsInt({ message: 'pageSize 必须是整数' })
  @Min(10, { message: 'pageSize 最小值为 10' })
  pageSize: number = 10;
}
