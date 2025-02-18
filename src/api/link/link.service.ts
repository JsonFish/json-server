import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import { Response } from '@/common/response'

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {}

  async findAll() {
    throw new NotFoundException('文章不存在');
    const linkList = await this.linkRepository.find()
    return Response.success({linkList})
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