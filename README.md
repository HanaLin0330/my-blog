# Hana's Blog

基于 Vue 3 + Vite 的纯静态个人博客站点。

## 特性

- 纯前端架构，无后端依赖，构建产物可直接部署到任意静态托管
- 文章以 Markdown 文件存储，通过 Vite 构建时加载，支持 YAML frontmatter
- 亮/暗主题切换，旋转背景图，毛玻璃 UI 风格
- 代码高亮（highlight.js）、Markdown 渲染（markdown-it）
- 响应式设计，适配移动端

## 目录结构

```
site/
├── background/          # 背景图片
├── public/              # 静态资源
├── src/
│   ├── components/      # Vue 组件
│   ├── config/          # 站点配置（标题、社交链接、友链等）
│   ├── content/         # 页面级 Markdown 内容（如关于页）
│   ├── posts/           # 博客文章（.md 文件 + frontmatter）
│   ├── router/          # Vue Router 路由
│   ├── utils/           # 工具函数（文章加载、Markdown 渲染）
│   ├── views/           # 页面视图
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── vite.config.js
└── package.json
```

## 写文章

在 `src/posts/` 目录下新建 `.md` 文件，格式如下：

```markdown
---
title: 文章标题
date: 2026-07-02
tags: [标签1, 标签2]
summary: 一句话摘要
---

正文内容...
```

文章按 `date` 字段降序排列。

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build      # 产物输出到 dist/
npm run preview    # 本地预览构建产物
```

## 配置

编辑 `src/config/site.js` 修改站点标题、昵称、简介、社交链接、友链等。

可选：在项目根目录创建 `.env` 文件设置 `VITE_BACKGROUND_CDN_BASE` 以从 CDN 加载背景图片。
