import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const mysqlConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '',
  port: 3306,
  username: 'root',
  password: '',
  database: '',
  autoLoadEntities: true, // 自动加载，注册实体
  dateStrings: true, // 格式化的日期字符串
  // 手动指定实体
  // entities: [
  //   User,
  //   Post,
  //   Comment,
  //   // ... 其他实体
  // ],
};

export default mysqlConfig;
