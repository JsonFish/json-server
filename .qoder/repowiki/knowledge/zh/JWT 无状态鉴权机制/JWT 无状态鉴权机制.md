---
kind: external_dependency
name: JWT 无状态鉴权机制
slug: jwt
category: external_dependency
category_hints:
    - auth_protocol
scope:
    - '**'
---

### JWT 访问令牌与刷新令牌
- 角色：实现无状态的用户身份验证和会话管理
- 集成点：`@nestjs/jwt` 模块 + `src/config/jwt.config.ts` 配置双密钥（accessSecretKey/refreshSecretKey）
- 使用模式：双令牌架构 - accessToken（1小时有效期）用于接口鉴权，refreshToken（1天有效期）用于续期；`AuthService.generateToken` 统一生成，`refreshToken` 方法用于刷新
- 安全考虑：不同业务场景使用独立密钥，避免单点泄露导致全部失效