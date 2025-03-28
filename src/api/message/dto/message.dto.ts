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

export class createMessageDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  text: string;

  @IsString()
  @MaxLength(45)
  @IsNotEmpty()
  borwserName: string;
}
