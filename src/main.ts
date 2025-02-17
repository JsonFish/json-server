import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@/core/exceptions/http-exception.filter';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';

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

  app.useGlobalFilters(new HttpExceptionFilter()); // 全局异常过滤器

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 启用自动类型转换
      whitelist: true, // 过滤掉未定义的属性
      stopAtFirstError: true, // 在第一个错误时停止验证
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('Json 博客接口文档')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
