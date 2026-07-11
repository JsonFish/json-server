---
kind: external_dependency
name: GitHub OAuth 第三方登录集成
slug: github-oauth
category: external_dependency
category_hints:
    - vendor_identity
    - auth_protocol
scope:
    - '**'
---

### GitHub OAuth 第三方登录
- 角色：项目唯一的用户认证来源，替代传统账号密码注册登录
- 集成点：`src/config/github.config.ts` 配置 client_id/client_secret，`src/api/auth/auth.service.ts` 的 `loginByGithub` 方法实现完整流程
- 使用模式：通过 axios 调用 GitHub OAuth 2.0 标准接口（`/login/oauth/access_token` + `/user`），获取 access_token 后拉取用户信息，基于 github_id 进行用户匹配或自动注册
- 数据持久化：用户表 `github_id` 字段建立唯一索引，确保一个 GitHub 账号只能关联一次
- 注意：需确认 GitHub OAuth 应用已正确配置回调地址和权限范围