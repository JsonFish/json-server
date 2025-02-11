import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const mysqlConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '',
  port: 3306,
  username: 'root',
  password: '',
  database: '',
};

export default mysqlConfig;
