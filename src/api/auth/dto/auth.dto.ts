import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';

export class EmailDto {
  @MaxLength(45)
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
export class LoginDto extends EmailDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @MinLength(4)
  @IsString()
  @IsNotEmpty()
  code: string;
}

export class RegisterDto extends LoginDto {}
