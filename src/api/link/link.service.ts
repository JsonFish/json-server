import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {}

  findAll(): Promise<Link[]> {
    return this.linkRepository.find();
  }

  create(link: Link): Promise<Link> {
    return this.linkRepository.save(link);
  }

  async update(id: number, link: Link): Promise<void> {
    await this.linkRepository.update(id, link);
  }

  async remove(id: number): Promise<void> {
    await this.linkRepository.delete(id);
  }
}