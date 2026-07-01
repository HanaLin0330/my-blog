# My Blog

一个使用 Vue 3、Vite 和 Express 搭建的个人博客。前端负责页面展示和背景图片轮换，后端负责读取 Markdown 文章。

## 外观特性

- 全站随机背景图片轮换
- 米色系主题色
- 导航、卡片、列表等非文章组件采用磨砂玻璃质感
- 支持全局浅色/暗色模式，并会记住上次选择

## 本地运行

安装依赖：

```bash
npm install
```

启动后端服务：

```bash
npm run dev:server
```

再开一个终端启动前端：

```bash
npm run dev:client
```

前端默认运行在 Vite 提供的本地地址，接口通过 `/api` 代理到 `http://localhost:3000`。

## 内容管理

文章放在 `server/posts/` 目录，格式为 Markdown。建议每篇文章包含 frontmatter：

```md
---
title: 文章标题
date: 2026-07-01
tags: [Vue, 博客]
summary: 这里写文章摘要。
---

这里写正文。
```

背景图片统一放在项目根目录的 `background/` 文件夹。页面会从这个目录随机选择图片，并定时轮换。当前背景资产统一为 `background-01.jpg` 这类连续命名，比例为 16:9，尺寸为 1920x1080。

## 常用命令

```bash
npm run build
npm run preview
npm run server
```

## 目录说明

- `src/`：前端页面、组件、路由和站点配置
- `server/`：Express 接口和 Markdown 文章读取
- `server/posts/`：博客文章
- `background/`：全站随机背景图片
- `public/`：静态资源

## 样式编辑入口

全局颜色、暗色模式、米色主题、玻璃透明度、圆角、阴影等基础视觉变量在 `src/style.css`。优先改这里，能一次影响大部分页面。

各页面自己的布局和局部样式在对应的 Vue 文件里：

- 首页：`src/views/Home.vue`
- 博客列表页：`src/views/Blog.vue`
- 文章详情页：`src/views/BlogPost.vue`
- 关于页：`src/views/About.vue`
- 友链页：`src/views/Friends.vue`
- 社交页：`src/views/SocialLinks.vue`

复用组件样式在 `src/components/`：

- 顶部导航和暗色切换：`src/components/NavBar.vue`
- 随机背景和遮罩：`src/components/PageBackground.vue`
- 博客文章卡片：`src/components/BlogCard.vue`
- 分页按钮：`src/components/Pagination.vue`

站点文案、昵称、简介、社交链接和友链在 `src/config/site.js`。
