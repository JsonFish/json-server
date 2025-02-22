import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {}

  async findApproved(query) {
    const { page, limit } = query;
    const [linkList, total] = await this.linkRepository.findAndCount({
      where: { status: 1, is_deleted: 0 },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { linkList, total };
  }

  async findUnaudited(query) {
    const { page, limit } = query;
    const [linkList, total] = await this.linkRepository.findAndCount({
      where: { status: 0, is_deleted: 0 },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { linkList, total };
  }

  async applyFor(link: any) {
    await this.linkRepository.save(link);
    return;
  }

  async examine(body: any) {
    const { id } = body;
    const link = await this.linkRepository.findOne({ where: { id } });
    if (!link) {
      throw new BadRequestException('该友链不存在');
    }

    await this.linkRepository.update(id, { status: 1 });
    return;
  }

  async update(id: number, link: Link): Promise<void> {
    await this.linkRepository.update(id, link);
  }

  async remove(id: number): Promise<void> {
    await this.linkRepository.delete(id);
  }
}
