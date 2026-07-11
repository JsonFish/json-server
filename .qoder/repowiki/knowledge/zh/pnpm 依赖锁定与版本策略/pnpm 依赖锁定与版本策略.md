---
kind: dependency_management
name: pnpm 依赖锁定与版本策略
category: dependency_management
scope:
    - '**'
source_files:
    - package.json
    - pnpm-lock.yaml
    - .pnpm-store/v3
---

本项目采用 pnpm 作为包管理器，通过 package.json 声明依赖、pnpm-lock.yaml 锁定精确版本，形成标准的 npm 生态依赖管理方案。

系统与方法
- 包管理器：pnpm（lockfileVersion 9.0），使用全局 .pnpm-store/v3 缓存目录进行跨项目共享存储。
- 依赖声明：package.json 中按 dependencies / devDependencies 分类；NestJS 核心包统一使用 ^11.x 语义化版本范围，第三方库如 axios、bcrypt、typeorm 等以 ^ 或固定版本号声明。
- 版本锁定：pnpm-lock.yaml 记录每个包的精确版本及完整 peerDependencies 树，确保安装可重现。
- 无私有仓库/镜像配置：未发现 .npmrc、registry 覆盖、NPM_TOKEN 或 private registry 相关设置，默认使用公共 npm 源。
- 无 monorepo/workspace：根目录不存在 pnpm-workspace.yaml，为单包单体应用。
- 无 vendoring：未将 node_modules 提交到版本控制，也不存在 vendor/ 目录。

关键文件
- package.json：依赖清单、脚本入口（build/start/test/lint 等）、lint-staged 钩子配置。
- pnpm-lock.yaml：锁文件，锁定所有直接和间接依赖的精确版本与 integrity。
- .pnpm-store/v3：pnpm 全局缓存目录（不在版本控制中）。
- .husky/pre-commit：结合 lint-staged 在提交前执行 pnpm lint 与 pnpm format。

架构与约定
- NestJS 全家桶（@nestjs/common/core/platform-express/jwt/swagger/typeorm/testing/cli/schematics）保持主版本一致，降低兼容风险。
- 开发工具链（eslint、prettier、ts-jest、ts-node、typescript-eslint）集中在 devDependencies，生产构建仅依赖 runtime 包。
- 运行时依赖精简：除 NestJS 框架外，仅引入业务必需的 mysql2、typeorm、axios、bcrypt、nodemailer、express-session 等。
- 测试与代码质量：Jest + ts-jest 运行单元测试，ESLint + Prettier 统一风格，lint-staged + husky 在 pre-commit 阶段强制执行。

开发者应遵循的规则
- 新增依赖时务必更新 package.json 并重新生成 pnpm-lock.yaml，禁止手动编辑锁文件。
- 优先使用 ^ 语义化版本范围以保持小版本自动升级，对需要严格固定的包（如 nanoid 3.3.7）才使用精确版本。
- 仅在 devDependencies 中添加构建、测试、格式化等非运行时工具。
- 不要将 node_modules 或 .pnpm-store 提交到 Git。
- 若需切换私有源或添加镜像，应在 .npmrc 或 pnpm 配置中集中声明，避免散落在各模块。