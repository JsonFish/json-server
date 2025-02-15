import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { QueryTagDto, CreateTagDto, UpdateTagDto } from './dto/tag.dto';
import { Response } from '@/common/response';
import { In } from 'typeorm';
@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async getTag({ currentPage, pageSize, tagName }: QueryTagDto) {
    const queryBuilder = this.tagRepository.createQueryBuilder('tag');

    if (tagName)
      queryBuilder.where('tagName LIKE :tagName', { tagName: `%${tagName}%` });

    queryBuilder.skip((currentPage - 1) * pageSize).take(pageSize);
    const [tagList, total] = await queryBuilder.getManyAndCount();

    return Response.success({ tagList, total });
  }

  async addTag({ tagName }: CreateTagDto) {
    // 检查标签是否已存在;
    const existTag = await this.tagRepository.findOne({ where: { tagName } });
    if (existTag) {
      return Response.error('标签已存在');
    }
    // 创建新标签
    const newTag = this.tagRepository.create({ tagName });
    await this.tagRepository.save(newTag);
    return Response.success();
  }

  async updateTag({ id, tagName }: UpdateTagDto) {
    // 检查标签是否存在
    const existTag = await this.tagRepository.findOne({ where: { id } });
    if (!existTag) {
      return Response.error('标签不存在');
    }

    // 检查新标签名是否与其他标签重复
    const duplicateTag = await this.tagRepository.findOne({
      where: { tagName, id },
    });
    if (duplicateTag) {
      return Response.error('标签名已存在');
    }

    // 更新标签
    existTag.tagName = tagName;
    await this.tagRepository.save(existTag);
    return Response.success();
  }

  async deleteTags(id: number[]) {
    // 检查所有标签是否存在
    const existTags = await this.tagRepository.findBy({ id: In(id) });
    if (existTags.length !== id.length) {
      return Response.error('部分标签不存在');
    }

    await this.tagRepository.delete(id);
    return Response.success();
  }
}
