import { IsString, IsNotEmpty, IsEmail, MaxLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(4)
  code: string;
}

export class UpdateAuthDto {}
