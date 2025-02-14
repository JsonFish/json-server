import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { QueryTagDto, CreateTagDto } from './dto/tag.dto';
import { ResponseDto } from '@/common/response.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async getTagList({ currentPage, pageSize, tagName }: QueryTagDto) {
    const queryBuilder = this.tagRepository.createQueryBuilder('tag');
    
    if (tagName)
      queryBuilder.where('tagName LIKE :tagName', { tagName: `%${tagName}%` });

    queryBuilder.skip((currentPage - 1) * pageSize).take(pageSize);
    const [tagList, total] = await queryBuilder.getManyAndCount();

    return ResponseDto.success({ tagList, total });
  }

  async addTag({ tagName }: CreateTagDto) {
    // 检查标签是否已存在;
    const existTag = await this.tagRepository.findOne({ where: { tagName } });
    if (existTag) {
      return ResponseDto.error('标签已存在');
    }
    // 创建新标签
    const newTag = this.tagRepository.create({ tagName });
    await this.tagRepository.save(newTag);
    return ResponseDto.success(newTag);
  }
}
