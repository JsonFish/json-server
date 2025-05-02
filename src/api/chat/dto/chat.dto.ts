import { IsString } from 'class-validator';

export class CreateChatMessageDto {
  @IsString()
  username: string;

  @IsString()
  message: string;

  @IsString()
  avatar: string;

  @IsString()
  createTime: string;

  @IsString()
  ip: string;
}
