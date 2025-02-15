import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  CreateCategoryDto,
  QueryCategoryDto,
  UpdateCategoryDto,
  DeleteCategoriesDto,
} from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll(@Query() query: QueryCategoryDto) {
    return this.categoryService.getCategory(query);
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.addCategory(createCategoryDto);
  }

  @Put()
  update(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(updateCategoryDto);
  }

  @Delete()
  remove(@Body() deleteDto: DeleteCategoriesDto) {
    return this.categoryService.deleteCategories(deleteDto.id);
  }
}
