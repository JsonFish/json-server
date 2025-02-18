import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import Response from '@/common/response';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {}

  async findApproved(page: number, limit: number) {
    const [linkList, total] = await this.linkRepository.findAndCount({
      where: { status: 1 },
      skip: (page - 1) * limit,
      take: limit,
    });
    return Response.success({ linkList, total });
  }

  async findUnaudited(page: number, limit: number) {
    const [linkList, total] = await this.linkRepository.findAndCount({
      where: { status: 1 },
      skip: (page - 1) * limit,
      take: limit,
    });
    return Response.success({ linkList, total });
  }

  async applyFor(link: any) {
    await this.linkRepository.save(link);
    return Response.success();
  }

  async update(id: number, link: Link): Promise<void> {
    await this.linkRepository.update(id, link);
  }

  async remove(id: number): Promise<void> {
    await this.linkRepository.delete(id);
  }
}
