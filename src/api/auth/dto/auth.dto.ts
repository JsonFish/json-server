import { IsNotEmpty, IsEmail, MaxLength } from 'class-validator';

export class EmailDto {
  @MaxLength(45)
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
