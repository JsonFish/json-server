import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './api/user/user.controller';
import { UserModule } from './api/user/user.module';
import { TagModule } from './api/tag/tag.module';
import mysqlConfig from './config/mysql.config';

@Module({
  imports: [TypeOrmModule.forRoot(mysqlConfig), UserModule, TagModule],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
