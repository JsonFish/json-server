import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Not } from 'typeorm';
import { Category } from './entities/category.entity';
import {
  QueryCategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategory({ currentPage, pageSize, categoryName }: QueryCategoryDto) {
    const queryBuilder = this.categoryRepository.createQueryBuilder('category');

    if (categoryName) {
      queryBuilder.where('categoryName LIKE :categoryName', {
        categoryName: `%${categoryName}%`,
      });
    }

    queryBuilder.skip((currentPage - 1) * pageSize).take(pageSize);
    const [categoryList, total] = await queryBuilder.getManyAndCount();

    return { categoryList, total };
  }

  async addCategory({ categoryName }: CreateCategoryDto) {
    // 检查分类是否已存在
    const existCategory = await this.categoryRepository.findOne({
      where: { categoryName },
    });
    if (existCategory) {
      throw Error('分类已存在');
    }

    // 创建新分类
    const newCategory = this.categoryRepository.create({ categoryName });
    await this.categoryRepository.save(newCategory);
    return;
  }

  async updateCategory({ id, categoryName }: UpdateCategoryDto) {
    // 检查分类是否存在
    const existCategory = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!existCategory) {
      throw Error('分类不存在');
    }

    // 检查新分类名是否与其他分类重复
    const duplicateCategory = await this.categoryRepository.findOne({
      where: { categoryName, id: Not(id) },
    });
    if (duplicateCategory) {
      throw Error('分类名已存在');
    }

    // 更新分类
    existCategory.categoryName = categoryName;
    await this.categoryRepository.save(existCategory);
    return;
  }

  async deleteCategories(ids: number[]) {
    // 检查所有分类是否存在
    const existCategories = await this.categoryRepository.findBy({
      id: In(ids),
    });
    if (existCategories.length !== ids.length) {
      throw Error('部分分类不存在');
    }

    await this.categoryRepository.delete(ids);
    return;
  }
}
