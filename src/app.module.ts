import { Module } from '@nestjs/common';
import { UserController } from './api/user/user.controller';
import { UserModule } from './api/user/user.module';
import { TagModule } from './api/tag/tag.module';

@Module({
  imports: [UserModule, TagModule],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
