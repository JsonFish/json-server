import { IsString, IsInt, MaxLength, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

import { PaginationDto } from '@/common/dto/pagination.dto';

export class QueryMessageDto extends PaginationDto {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  status: number = 1;
}

export class createMessageDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  text: string;
}
