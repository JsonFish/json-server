---
kind: error_handling
name: NestJS 全局异常过滤与 HTTP 错误处理
category: error_handling
scope:
    - '**'
source_files:
    - src/core/filter/http-exception.filter.ts
    - src/core/filter/all-exception.filter.ts
    - src/core/guard/auth.guard.ts
    - src/main.ts
---

该 NestJS 单体应用采用框架内置的 `ExceptionFilter` + `HttpException` 体系进行错误处理，未引入自定义业务错误类型或统一错误码枚举。核心机制如下：

1. **全局过滤器**：在 `src/main.ts` 中通过 `app.useGlobalFilters(new HttpExceptionFilter())` 注册全局 `HttpExceptionFilter`，所有 `HttpException` 子类抛出的异常均被拦截。
2. **统一响应格式**：`HttpExceptionFilter` 将异常转换为 `{ code, message, data }` 结构，其中 `data` 包含请求上下文（query/body/params/method/url），便于调试；同时针对 400 状态码做了特殊处理，将其映射为 200 返回，保持前端统一的成功态接口。
3. **业务层抛出方式**：Service 和 Guard 直接通过 `throw new BadRequestException(...)` / `throw new UnauthorizedException()` 抛出标准 HTTP 异常，未定义领域级错误对象或错误码常量。
4. **鉴权异常**：`AuthGuard` 在 token 缺失或校验失败时抛出 `UnauthorizedException`，由全局过滤器统一捕获并格式化。
5. **验证管道**：通过全局 `ValidationPipe`（`stopAtFirstError: true`）对 DTO 输入进行校验，校验失败同样走全局过滤器流程。
6. **兜底过滤器**：`AllExceptionFilter` 存在但未被使用，其设计思路可作为未来非 HTTP 异常的兜底方案。

约定与建议：
- 业务错误应统一使用 `@nestjs/common` 提供的 `BadRequestException`、`UnauthorizedException`、`ForbiddenException`、`NotFoundException`、`InternalServerErrorException` 等，避免裸字符串或自定义错误类。
- 若需区分业务错误与系统错误，建议引入统一错误码枚举并在过滤器中根据 code 字段做差异化处理。
- 当前 `HttpExceptionFilter` 将 4xx 强制改为 200 的做法会破坏 REST 语义，建议移除该逻辑，让前端自行判断 `code` 字段。