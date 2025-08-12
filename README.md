# 收银台模板 (Payment Template)

## 项目简介

这是一个基于 Vite + Vue3 + TypeScript 的收银台前端模板，集成了国际化、消息提示等功能，是一个拿来即用的最干净的前端框架。本模板专为需要快速构建多语言支持、用户友好界面的支付系统或收银台应用而设计。

## 技术栈

- **构建工具**：Vite - 极速的前端构建工具
- **前端框架**：Vue 3 - 渐进式 JavaScript 框架
- **开发语言**：TypeScript - 带类型系统的 JavaScript 超集
- **国际化**：Vue I18n - 支持多语言切换，已集成英语、韩语等多种语言
- **消息提示**：内置友好的消息提示系统，支持成功、错误、警告等多种类型
- **样式处理**：SASS - CSS 预处理器，提升样式编写效率
- **HTTP 客户端**：集成 flyio，支持请求拦截、响应处理
- **工具函数**：丰富的工具函数库，包括 URL 处理、时间格式化等

## 特性

### 1. 完善的国际化支持

- 支持多语言切换（英语、韩语等）
- 自动检测浏览器语言
- 支持通过 URL 参数切换语言
- 语言文件使用 JSON 格式，易于维护和扩展

### 2. 即用型消息提示

- 支持多种类型的消息提示：成功、错误、警告、信息
- 简洁易用的 API
- 可自定义样式和显示时间

### 3. 优化的依赖管理

- 合理区分运行时依赖和开发依赖
- 减小生产环境打包体积

### 4. 实用工具函数

- URL 参数处理
- 浏览器语言检测
- 时间格式化
- 复制到剪贴板
- 等多种常用功能

## 快速开始

```bash
# 安装依赖
npm install

# 开发环境运行
npm run dev

# 生产环境构建
npm run build
```

## 项目结构

```
├── public/             # 静态资源
├── src/
│   ├── assets/         # 项目资源文件
│   ├── components/     # 公共组件
│   ├── i18n/           # 国际化配置
│   │   ├── locales/    # 语言文件 (JSON)
│   │   ├── config.ts   # 国际化配置
│   │   └── index.ts    # 国际化入口
│   ├── utils/          # 工具函数
│   ├── views/          # 页面组件
│   ├── App.vue         # 根组件
│   └── main.ts         # 入口文件
├── package.json        # 项目依赖
└── vite.config.ts      # Vite 配置
```

## 国际化使用

```vue
<template>
  <div>{{ $t('common.welcome') }}</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
console.log(t('common.welcome'));
</script>
```

## 消息提示使用

```typescript
import { useMessage } from '@/hooks/useMessage';

const message = useMessage();
message.success('操作成功');
message.error('操作失败');
message.warning('警告信息');
message.info('提示信息');
```

## 贡献

欢迎提交 Issue 或 Pull Request 来完善这个模板。

## 许可

[MIT](LICENSE)
