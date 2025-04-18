import { IsString, MaxLength, IsNotEmpty, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateArticleDto {}

export class QueryArticleFto {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  status: number;

  @MaxLength(45)
  @IsString()
  title: string;
}
