
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { LinkService } from './link.service';
import { Link } from './entities/link.entity';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}
  @Get()
  findAll() {
    return this.linkService.findAll();
  }

  @Post()
  create(@Body() link: Link) {
    return this.linkService.create(link);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() link: Link) {
    return this.linkService.update(+id, link);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkService.remove(+id);
  }
}