import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './api/user/user.module';
import { TagModule } from './api/tag/tag.module';
import { CategoryModule } from './api/category/category.module';
import mysqlConfig from './config/mysql.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(mysqlConfig),
    UserModule,
    TagModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
