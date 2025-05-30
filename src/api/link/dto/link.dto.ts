import {
  IsString,
  IsInt,
  MaxLength,
  IsNotEmpty,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '@/common/dto/pagination.dto';

export class CreateLinkDto {
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  avatar: string;

  @MaxLength(45)
  @IsString()
  @IsNotEmpty()
  description: string;

  @MaxLength(45)
  @IsString()
  @IsNotEmpty()
  link: string;
}

export class UpdateLinkDto extends CreateLinkDto {
  @IsInt()
  @IsNotEmpty()
  id: number;
}

export class QueryLinkDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @MaxLength(20)
  name?: string;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  status: number = 1;
}

export class ExamineLinkDto {
  @IsInt()
  @IsNotEmpty()
  id: number;
}

export class DeleteLinksDto {
  @IsInt({ each: true })
  @IsArray()
  @IsNotEmpty()
  id: number[];
}
