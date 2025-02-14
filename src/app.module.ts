import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@/core/filter/http-exception.filter';
import { UserModule } from './api/user/user.module';
import { TagModule } from './api/tag/tag.module';
import mysqlConfig from './config/mysql.config';

@Module({
  imports: [TypeOrmModule.forRoot(mysqlConfig), UserModule, TagModule],
  controllers: [],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },
  ],
})
export class AppModule {}
