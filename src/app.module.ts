import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { ArticleModule } from './api/article/article.module';
import mysqlConfig from './config/mysql.config';
import { AllExceptionFilter } from './core/filter/all-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { AuthGuard } from './core/guard/auth.guard';
import { THROTTLE_TTL, THROTTLE_LIMIT } from './config/throttle.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(mysqlConfig),
    ThrottlerModule.forRoot([
      { name: 'default', ttl: THROTTLE_TTL, limit: THROTTLE_LIMIT },
    ]),
    UserModule,
    AuthModule,
    ArticleModule,
  ],
  controllers: [],
  providers: [
    // 注册顺序即执行顺序：先限流再鉴权，让未认证的请求在进入业务前就被挡住。
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
