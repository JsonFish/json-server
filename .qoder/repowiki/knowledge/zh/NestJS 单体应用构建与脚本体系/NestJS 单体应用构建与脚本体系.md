---
kind: build_system
name: NestJS 单体应用构建与脚本体系
category: build_system
scope:
    - '**'
source_files:
    - package.json
    - nest-cli.json
    - tsconfig.json
    - tsconfig.build.json
---

本项目采用 NestJS CLI 作为核心构建系统，基于 pnpm 进行依赖管理，通过 TypeScript + ts-jest 完成编译、测试与产物输出。整体为单仓库单体架构，无多包 monorepo 拆分，也无 Docker/CI/Makefile 等外部构建编排文件。

**构建工具链**
- 构建入口：`nest build`（由 `@nestjs/cli` 驱动），底层使用 SWC（`@swc/core`）加速编译，输出目录为 `dist/`，每次构建前自动清理旧产物（`deleteOutDir: true`）。
- 类型系统与路径别名：`tsconfig.json` 定义 `@/*` → `./src/*` 的 baseUrl 映射，`tsconfig.build.json` 继承并排除 test/spec 文件以生成生产产物。
- 运行模式：开发 `pnpm start:dev`（watch）、调试 `pnpm start:debug`、生产 `pnpm start:prod`（直接执行 `node dist/main`）。
- 代码质量：ESLint 9 + Prettier 3，配合 husky + lint-staged 在 pre-commit 钩子中执行 `pnpm lint --fix` 和 `pnpm format`。

**测试体系**
- 单元测试：Jest 29 + ts-jest，根目录 `src`，匹配 `*.spec.ts`，覆盖率输出至 `coverage/`。
- E2E 测试：独立配置 `test/jest-e2e.json`，通过 `pnpm test:e2e` 运行。
- 测试调试：`pnpm test:debug` 通过 `ts-node` + `--inspect-brk` 支持断点调试。

**依赖管理**
- 包管理器：pnpm（存在 `pnpm-lock.yaml` 与 `.pnpm-store`）。
- 运行时依赖：NestJS 11、TypeORM 0.3、MySQL2、JWT、Swagger、bcrypt、nodemailer 等。
- 开发依赖：包含 `@swc/cli`、`ts-loader`、`ts-node`、`supertest` 等构建与测试辅助工具。

**约定与约束**
- 源码位于 `src/`，构建产物位于 `dist/`，测试文件统一以 `.spec.ts` 后缀命名。
- 未引入 Dockerfile、docker-compose、GitHub Actions、Makefile 或任何 CI/CD 流水线脚本；部署方式未在仓库中体现。
- 版本号为 `0.0.1`，遵循 npm 语义化版本，但未见自动化发布脚本或 changelog 管理。