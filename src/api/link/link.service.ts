import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, Like } from 'typeorm';
import { Link } from './entities/link.entity';
import { QueryLinkDto, CreateLinkDto, ExamineLinkDto } from './dto/link.dto';
@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {}

  async findAll(query: QueryLinkDto) {
    const { page, pageSize, status, name } = query;
    const [linkList, total] = await this.linkRepository.findAndCount({
      where: {
        name: name ? Like(`%${name}%`) : undefined,
        status,
        is_deleted: 0,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { linkList, total };
  }

  async applyFor(linkData: CreateLinkDto, userId: string) {
    if (!userId) throw new BadRequestException('请登录后再做尝试');
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

  async remove(id: number[]): Promise<void> {
    const existLinks = await this.linkRepository.findBy({ id: In(id) });
    if (existLinks.length !== id.length) {
      throw new BadRequestException('删除失败');
    }
    await this.linkRepository.delete(id);
    return;
  }
}
