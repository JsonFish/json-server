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

  async findApproved(query) {
    const { page, limit } = query;
    const [linkList, total] = await this.linkRepository.findAndCount({
      where: { status: 1, is_deleted: 0 },
      skip: (page - 1) * limit,
      take: limit,
    });
    return Response.success({ linkList, total });
  }

  async findUnaudited(query) {
    const { page, limit } = query;
    const [linkList, total] = await this.linkRepository.findAndCount({
      where: { status: 0, is_deleted: 0 },
      skip: (page - 1) * limit,
      take: limit,
    });
    return Response.success({ linkList, total });
  }

  async applyFor(link: any) {
    await this.linkRepository.save(link);
    return Response.success();
  }

  async examine(body: any) {
    const { id } = body;
    const link = await this.linkRepository.findOne({ where: { id } });
    if (!link) {
      throw new Error('链接不存在'); // 或者使用自定义异常处理
    }

    console.log(id);
    const res = await this.linkRepository.update(id, { status: 1 });
    return res;
  }

  async update(id: number, link: Link): Promise<void> {
    await this.linkRepository.update(id, link);
  }

  async remove(id: number): Promise<void> {
    await this.linkRepository.delete(id);
  }
}
