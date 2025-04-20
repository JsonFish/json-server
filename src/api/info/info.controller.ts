import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.infoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInfoDto: any) {
    return this.infoService.update(+id, updateInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.infoService.remove(+id);
  }
}
