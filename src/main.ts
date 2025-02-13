import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'xiaoyu',
      name: 'xiaoyu666',
      rolling: true,
      cookie: { maxAge: 99999 },
    }),
  );

  // 添加全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 启用自动类型转换
      whitelist: true, // 过滤掉未定义的属性
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
