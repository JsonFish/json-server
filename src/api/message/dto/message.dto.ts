import {
  IsString,
  IsInt,
  MaxLength,
  IsNotEmpty,
  IsArray,
  IsOptional,
} from 'class-validator';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { Type } from 'class-transformer';

export class QueryMessageDto extends PaginationDto {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  status: number;
}

export class createMessageDto {}
