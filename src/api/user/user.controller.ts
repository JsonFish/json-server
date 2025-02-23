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
import { Request } from 'express';
import { AddUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { Public } from '@/core/guard/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() Query: any) {
    return this.userService.findAll(Query);
  }

  @Public()
  @Post()
  addUser(@Req() request: Request, @Body() addUserDto: AddUserDto) {
    return this.userService.addUser(addUserDto, request.ip);
  }
  @Put()
  update() {}
  @Delete()
  remove() {}
}
