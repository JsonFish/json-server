import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() Query: any) {
    return this.userService.findAll(Query);
  }

  @Post()
  create(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Put()
  update() {}
  @Delete()
  remove() {}
}
