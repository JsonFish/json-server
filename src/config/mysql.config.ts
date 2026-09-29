import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import './env';

const poolSize = Number(process.env.DB_POOL_SIZE ?? 10);

const mysqlConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST ?? '127.0.0.1',
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USERNAME ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_DATABASE ?? 'jsonfi',
  autoLoadEntities: true,
  dateStrings: true,
  // PM2 cluster 下每个实例会各建一个连接池，
  // 实例数 × poolSize 必须小于 MySQL 的 max_connections。
  poolSize,
  extra: { connectionLimit: poolSize },
  // 数据库比应用先启动时给出重试机会，避免容器/进程竞态导致启动失败。
  retryAttempts: Number(process.env.DB_RETRY_ATTEMPTS ?? 5),
  retryDelay: Number(process.env.DB_RETRY_DELAY ?? 3000),
};

export default mysqlConfig;
