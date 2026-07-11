---
kind: frontend_style
name: 前端样式系统：本仓库不包含前端 UI 代码
category: frontend_style
scope:
    - '**'
---

该仓库是一个纯后端的 NestJS 单体应用，仅提供 REST API（文章、用户、认证等模块），未包含任何前端页面或组件代码。经检查，仓库中不存在 CSS/SCSS/Less/Stylus 样式文件，也未引入 Tailwind、PostCSS、styled-components、Emotion、Ant Design、Element UI、Vuetify 等任何前端样式框架或工具链；package.json 的依赖与脚本也仅围绕后端构建、测试与格式化。因此，`frontend_style` 类别不适用于此仓库。