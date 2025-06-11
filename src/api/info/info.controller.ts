import { Controller, Get, Body, Put, Param, Delete } from '@nestjs/common';
import { InfoService } from './info.service';
import { Public } from '@/core/guard/public.decorator';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Public()
  @Get()
  findAll() {
    return this.infoService.findAll();
  }

  @Put()
  async update(@Body() updateInfoDto: any) {
    return await this.infoService.update(updateInfoDto);
  }
}
