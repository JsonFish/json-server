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
  findAll(@Query() Query: { username: string }) {
    console.log(Query);
    return this.userService.getUserList();
  }

  @Post()
  create(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Put()
  update(){

  }
  @Delete()
  remove() {}
}
