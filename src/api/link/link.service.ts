import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, Like } from 'typeorm';
import { Link } from './entities/link.entity';
import {
  QueryLinkDto,
  CreateLinkDto,
  ExamineLinkDto,
  UpdateLinkDto,
} from './dto/link.dto';
@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {}

  async findAll(query: QueryLinkDto) {
    const { page, pageSize, status, name } = query;
    const [linkList, total] = await this.linkRepository.findAndCount({
      relations: ['userInfo'],
      where: {
        name: name ? Like(`%${name}%`) : undefined,
        status,
        is_deleted: 0,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    const formatList = linkList.map((item) => {
      const { userInfo, ...rest } = item;
      return {
        ...rest,
        email: userInfo.email,
        userAvatar: userInfo.avatar,
        username: userInfo.username,
      };
    });
    return { linkList: formatList, total };
  }

  async applyFor(linkData: CreateLinkDto, userId: number) {
    if (!userId) throw new BadRequestException('登录后才能申请哦');
    const link = await this.linkRepository.findOne({
      where: { user_id: userId, is_deleted: 0 },
    });
    if (link) {
      throw new BadRequestException('你已申请，请勿重复申请');
    }
    await this.linkRepository.save({ ...linkData, user_id: userId });
    return;
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

  async update(link: UpdateLinkDto): Promise<void> {
    const { id } = link;
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
