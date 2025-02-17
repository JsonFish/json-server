import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { UserModule } from './api/user/user.module';
import { TagModule } from './api/tag/tag.module';
import { CategoryModule } from './api/category/category.module';
import mysqlConfig from './config/mysql.config';
import { AllExceptionFilter } from './core/filter/all-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot(mysqlConfig),
    UserModule,
    TagModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
