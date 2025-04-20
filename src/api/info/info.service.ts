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

  findOne(id: number) {
    return `This action returns a #${id} info`;
  }

  update(id: number, updateInfoDto: any) {
    return `This action updates a #${id} info`;
  }

  remove(id: number) {
    return `This action removes a #${id} info`;
  }
}
