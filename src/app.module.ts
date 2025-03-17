import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { UserModule } from './api/user/user.module';
import { TagModule } from './api/tag/tag.module';
import { LinkModule } from './api/link/link.module';
import { AuthModule } from './api/auth/auth.module';
import { MessageModule } from './api/message/message.module';
import { ArticleModule } from './api/article/article.module';
import mysqlConfig from './config/mysql.config';
import { AllExceptionFilter } from './core/filter/all-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { AuthGuard } from './core/guard/auth.guard';
@Module({
  imports: [
    TypeOrmModule.forRoot(mysqlConfig),
    UserModule,
    TagModule,
    LinkModule,
    AuthModule,
    MessageModule,
    ArticleModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
