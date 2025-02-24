import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import { QueryLinkDto, CreateLinkDto } from './dto/link.dto';
@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {}

  async findAll(query: QueryLinkDto) {
    const { page, pageSize, status } = query;
    const [linkList, total] = await this.linkRepository.findAndCount({
      where: { status, is_deleted: 0 },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { linkList, total };
  }

  async applyFor(link: CreateLinkDto) {
    await this.linkRepository.save(link);
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
