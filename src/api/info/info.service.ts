import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Information } from './entities/info.entity';

@Injectable()
export class InfoService {
  constructor(
    @InjectRepository(Information)
    private readonly informationRepository: Repository<Information>,
  ) {}

  async findAll() {
    const infoData = await this.informationRepository.find();
    return infoData[0];
  }

  async update(updateInfoDto: any) {
    await this.informationRepository.update(1, updateInfoDto);
    return;
  }
}
