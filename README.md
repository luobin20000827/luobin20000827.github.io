# 我的技术博客 (Astro)

极简、内容驱动的静态博客。文章用 Markdown 写，构建后是纯静态文件，可部署到任意静态托管。

## 本地运行

```bash
npm install      # 已装过可跳过
npm run dev      # 开发预览，默认 http://localhost:4321
npm run build    # 生成 dist/
npm run preview  # 预览构建产物
```

## 目录结构

```
src/
  content/blog/       # 所有文章放这里（.md）
  content.config.ts   # frontmatter 字段定义
  pages/              # 路由：首页 / blog 列表 / blog 详情 / about
  layouts/            # BaseLayout、BlogPost
  components/         # Header / Footer / FormattedDate
  styles/global.css   # 全局样式（配色 / 深浅色主题）
```

## 怎么发一篇文章

在 `src/content/blog/` 新建 `my-post.md`，文件名就是访问地址 `/blog/my-post`：

```markdown
---
title: 文章标题
description: 一句话摘要，列表页会显示
pubDate: 2026-10-07
tags: ["java", "database"]
draft: false          # 设为 true 则不发布
---

正文，支持 Markdown 与代码块。
```

保存后列表页、详情页、RSS、sitemap 全部自动更新，无需改其它文件。

## 改成你自己的信息

- 名字/导航：`src/components/Header.astro` 里的 `SITE`
- 首页自我介绍：`src/pages/index.astro`
- 关于页：`src/pages/about.astro`
- RSS 标题：`src/pages/rss.xml.js`
- 配色（含深色模式）：`src/styles/global.css` 的 CSS 变量
- 站点域名：`astro.config.mjs` 的 `site`

## 部署

### GitHub Pages（用户/组织主页，最快）
1. 仓库推送到 GitHub，`Settings → Pages → Source` 选 GitHub Actions。
2. 加一个 workflow `.github/workflows/deploy.yml`，用官方 `withastro/action`：
   ```yaml
   name: Deploy
   on: { push: { branches: [main] } }
   permissions: { contents: read, pages: write, id-token: write }
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: withastro/action@v3
     deploy:
       needs: build
       runs-on: ubuntu-latest
       environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }
       steps:
         - id: deployment
           uses: actions/deploy-pages@v4
   ```
   把 `astro.config.mjs` 的 `site` 改成 `https://<用户名>.github.io`。

### GitHub Pages（项目页 username.github.io/repo）
额外在 `astro.config.mjs` 设置 `base: '/repo'`（去掉注释那行）。

### Cloudflare Pages（推荐，国内访问更稳）
- 连仓库，Build command `npm run build`，Output directory `dist`。
- 或本地构建后用 `wrangler pages deploy dist`。

## 已内置
- 深色模式（跟随系统 `prefers-color-scheme`）
- RSS 订阅 `/rss.xml`
- 自动 sitemap
- 零客户端 JS，首屏极快
