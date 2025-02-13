import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { QueryTagDto } from './dto/tag.dto';
@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async getTagList({ currentPage, pageSize, tagName }: QueryTagDto) {
    const queryBuilder = this.tagRepository.createQueryBuilder('tag');

    if (tagName) {
      queryBuilder.where('tagName LIKE :tagName', { tagName: `%${tagName}%` });
    }

    queryBuilder.skip((currentPage - 1) * pageSize).take(pageSize);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
    };
  }
}
