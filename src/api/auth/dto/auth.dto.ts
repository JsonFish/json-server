import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class EmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
export class LoginDto extends EmailDto {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  code: string;
}

export class RegisterDto extends LoginDto {}

export class UpdateAuthDto {}
