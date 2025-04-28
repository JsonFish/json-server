import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '@/common/dto/pagination.dto';

class EmailDto {
  @MaxLength(45)
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class AddUserDto extends EmailDto {
  @MaxLength(45)
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class QueryUserDto extends PaginationDto {
  @IsOptional()
  @MaxLength(45)
  @IsString()
  email?: string;

  @IsOptional()
  @MaxLength(25)
  @IsString()
  username?: string;
}

export class UpdateUserDto extends EmailDto {
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  id: string;

  @MaxLength(25)
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsInt()
  @IsNotEmpty()
  role: number;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  avatar: string;

  @IsString()
  ip: string;

  @IsString()
  ipAddress: string;

  @IsString()
  githubId: string;
}

export class ShieldUserDto {
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  id: string;
}
