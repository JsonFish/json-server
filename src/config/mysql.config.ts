import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const mysqlConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'host',
  port: 3306,
  username: 'username',
  password: 'password',
  database: 'database',
  autoLoadEntities: true,
  dateStrings: true,
};

export default mysqlConfig;
