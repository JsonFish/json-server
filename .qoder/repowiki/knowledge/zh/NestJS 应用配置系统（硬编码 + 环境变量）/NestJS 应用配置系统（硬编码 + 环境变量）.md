---
kind: configuration_system
name: NestJS 应用配置系统（硬编码 + 环境变量）
category: configuration_system
scope:
    - '**'
source_files:
    - src/config/mysql.config.ts
    - src/config/jwt.config.ts
    - src/config/github.config.ts
    - src/app.module.ts
    - src/main.ts
---

## 1. 采用的方式
本项目未使用 `@nestjs/config`、`registerAs`、`.env` 等现代 NestJS 配置方案，而是采用**纯 TypeScript 常量模块 + 启动时 `process.env` 读取**的轻量级方式：
- 每个外部依赖（MySQL、JWT、GitHub OAuth）在 `src/config/` 下提供一个默认导出的配置对象。
- 应用入口 `src/main.ts` 通过 `process.env.PORT` 读取运行端口。
- 其余敏感值（session secret、Swagger 标题等）直接以字符串字面量硬编码在代码中。

## 2. 关键文件与包
- `src/config/mysql.config.ts` — TypeORM 连接配置（typeorm 选项对象）
- `src/config/jwt.config.ts` — JWT access/refresh token 密钥占位符
- `src/config/github.config.ts` — GitHub OAuth client_id / client_secret 占位符
- `src/app.module.ts` — 通过 `TypeOrmModule.forRoot(mysqlConfig)` 注入数据库配置；全局过滤器/拦截器/守卫在此注册
- `src/main.ts` — 应用启动、Express session 配置、ValidationPipe、Swagger 文档、监听端口（来自 `process.env.PORT`）
- `package.json` — 无 `dotenv` 依赖，仅在生产脚本 `start:prod` 执行 `node dist/main`
- `.gitignore` 中包含 dotenv 忽略规则，但仓库内不存在任何 `.env*` 文件

## 3. 架构与约定
- **配置即模块**：`config/` 下的每个文件导出一个普通对象，由 `AppModule` 按需 import 并传入对应模块的 `forRoot` 或构造函数。
- **无运行时加载**：没有配置文件（yaml/toml/env），也没有配置中心或环境变量前缀约定；所有键名都是源码中的字符串字面量。
- **占位符模式**：`mysql.config.ts`、`jwt.config.ts`、`github.config.ts` 中的值均为 `'host'`、`'username'`、`'accessSecretKey'` 等占位字符串，实际部署时需替换为真实值。
- **混合策略**：只有端口通过 `process.env.PORT` 注入，其余全部写死在源码里。

## 4. 开发者应遵循的规则
1. **新增外部依赖配置**：在 `src/config/` 下新建同名 TS 文件，导出默认对象，并在 `AppModule` 或对应业务模块中 import 后传入。
2. **避免散落的字符串字面量**：将 session secret、第三方 API key、邮件 SMTP 等敏感信息从 `main.ts` / service 中抽离到 `config/` 模块，便于集中管理。
3. **谨慎使用 `process.env`**：当前仅在端口上使用该方式；如需扩展，建议统一加上默认值回退（如 `process.env.PORT ?? 3001`）。
4. **不要提交真实密钥**：现有占位符表明这些值应在部署阶段替换；切勿将真实密码、client_secret 提交到版本库。
5. **考虑迁移到 `@nestjs/config`**：若后续需要多环境（dev/staging/prod）配置，建议引入 `@nestjs/config` + `.env` 文件，以获得类型安全与环境隔离。