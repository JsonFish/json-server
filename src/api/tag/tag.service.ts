import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository, Like } from 'typeorm';
import { QueryTagDto, CreateTagDto, UpdateTagDto } from './dto/tag.dto';
import { In } from 'typeorm';
@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async getTag({ page, pageSize, tagName }: QueryTagDto) {
    const [tagList, total] = await this.tagRepository.findAndCount({
      where: {
        tagName: tagName ? Like(`%${tagName}%`) : undefined,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { tagList, total };
  }

  async addTag({ tagName }: CreateTagDto) {
    const existTag = await this.tagRepository.findOne({ where: { tagName } });
    if (existTag) {
      throw new BadRequestException('标签已存在');
    }
    const newTag = this.tagRepository.create({ tagName });
    await this.tagRepository.save(newTag);
    return;
  }

  async updateTag({ id, tagName }: UpdateTagDto) {
    const existTag = await this.tagRepository.findOne({ where: { id } });
    if (!existTag) {
      throw new BadRequestException('标签不存在');
    }

    const duplicateTag = await this.tagRepository.findOne({
      where: { tagName, id },
    });
    if (duplicateTag) {
      throw new BadRequestException('标签名已存在');
    }

    existTag.tagName = tagName;
    await this.tagRepository.save(existTag);
    return;
  }

  async deleteTag(id: number[]) {
    const existTags = await this.tagRepository.findBy({ id: In(id) });
    if (existTags.length !== id.length) {
      throw new BadRequestException('部分标签不存在');
    }

    await this.tagRepository.delete(id);
    return;
  }
}
