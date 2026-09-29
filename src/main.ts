import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

import { HttpExceptionFilter } from '@/core/filter/http-exception.filter';
import { isProduction, resolveCorsOrigins } from '@/config/env';

async function bootstrap() {
  // 先校验配置再初始化应用，让配置问题以清晰的报错终止启动。
  const corsOrigins = resolveCorsOrigins();
  const port = Number(process.env.PORT ?? 3001);

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: corsOrigins,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Disposition'],
    maxAge: 86400,
  });
  app.enable('trust proxy');
  // 让 SIGINT/SIGTERM 能触发 TypeORM 等 provider 优雅关闭，避免 PM2 重启时留下悬挂连接。
  app.enableShutdownHooks();
  app.useGlobalFilters(new HttpExceptionFilter()); // 全局异常过滤器

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 启用自动类型转换
      whitelist: true, // 过滤掉未定义的属性
      stopAtFirstError: true, // 在第一个错误时停止验证
    }),
  );

  // 默认仅在非生产环境暴露接口文档；确需在生产开启时可显式设 SWAGGER_ENABLED=true
  // （建议另行加访问控制，否则会向公网公开完整的写接口清单）。
  const swaggerEnabled =
    process.env.SWAGGER_ENABLED === 'true' || !isProduction;

  if (swaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle('接口文档')
      .setDescription('Json 博客接口文档')
      .setVersion('1.0')
      .build();

    SwaggerModule.setup(
      'api-docs',
      app,
      SwaggerModule.createDocument(app, config),
    );
    console.log('Swagger UI: /api-docs');
  }

  await app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`CORS allowed origins: ${corsOrigins.join(', ')}`);
  });
}

void bootstrap();
