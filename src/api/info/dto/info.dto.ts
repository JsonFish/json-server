import { PartialType } from '@nestjs/mapped-types';
export class UpdateInfoDto extends PartialType(CreateInfoDto) {}
