import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import { QueryLinkDto, CreateLinkDto, ExamineLinkDto } from './dto/link.dto';
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

  async applyFor(linkData: CreateLinkDto, userId: string) {
    const link = await this.linkRepository.findOne({
      where: { user_id: userId, is_deleted: 0 },
    });
    if (link) {
      throw new BadRequestException('你已申请，请勿重复申请');
    }
    await this.linkRepository.save({ ...linkData, user_id: userId });
  }

  async examine(body: ExamineLinkDto) {
    const { id } = body;
    const link = await this.linkRepository.findOne({
      where: { id, is_deleted: 0 },
    });
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
