import { IsEmail, IsString } from 'class-validator';

export class AddUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
