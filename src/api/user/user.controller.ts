import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Put,
  Delete,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { QueryUserDto, ShieldUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() query: QueryUserDto) {
    return this.userService.getUserList(query);
  }

  @Put()
  update(@Body() body: UpdateUserDto) {
    return this.userService.updateUser(body);
  }

  @Delete()
  shield(@Body() body: ShieldUserDto) {
    return this.userService.shieldUser(body);
  }
}
