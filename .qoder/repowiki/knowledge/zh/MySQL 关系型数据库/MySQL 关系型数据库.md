---
kind: external_dependency
name: MySQL 关系型数据库
slug: mysql-关系型数据库
category: external_dependency
scope:
    - '**'
---

### MySQL 数据库服务
- 角色：项目的核心数据存储，承载用户、文章、标签等业务数据
- 集成点：`src/config/mysql.config.ts` 通过 TypeORM 配置连接参数（host/port/username/password/database）
- 使用模式：TypeORM 作为 ORM 框架，配合 `autoLoadEntities: true` 自动加载实体类映射
- 初始化脚本：`sql/init.sql` 提供完整的建库建表语句，包含 utf8mb4 字符集支持 emoji
- 注意：生产环境需将配置文件中的占位符替换为实际连接参数