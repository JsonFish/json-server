import {
  IsString,
  IsInt,
  MaxLength,
  IsNotEmpty,
  IsArray,
  IsOptional,
} from 'class-validator';
import { PaginationDto } from '@/common/dto/pagination.dto';

export class QueryMessageDto extends PaginationDto {}
