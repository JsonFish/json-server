import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { QueryTagDto, CreateTagDto, UpdateTagDto } from './dto/tag.dto';
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

    return { tagList, total };
  }

  async addTag({ tagName }: CreateTagDto) {
    // 检查标签是否已存在;
    const existTag = await this.tagRepository.findOne({ where: { tagName } });
    if (existTag) {
      throw Error('标签已存在');
    }
    // 创建新标签
    const newTag = this.tagRepository.create({ tagName });
    await this.tagRepository.save(newTag);
    return;
  }

  async updateTag({ id, tagName }: UpdateTagDto) {
    // 检查标签是否存在
    const existTag = await this.tagRepository.findOne({ where: { id } });
    if (!existTag) {
      throw Error('标签不存在');
    }

    // 检查新标签名是否与其他标签重复
    const duplicateTag = await this.tagRepository.findOne({
      where: { tagName, id },
    });
    if (duplicateTag) {
      throw Error('标签名已存在');
    }

    // 更新标签
    existTag.tagName = tagName;
    await this.tagRepository.save(existTag);
    return;
  }

  async deleteTag(id: number[]) {
    // 检查所有标签是否存在
    const existTags = await this.tagRepository.findBy({ id: In(id) });
    if (existTags.length !== id.length) {
      throw Error('部分标签不存在');
    }

    await this.tagRepository.delete(id);
    return;
  }
}
