---
title: 我为什么用 Astro 搭这个博客
description: 想要一个加载快、能持续写 Markdown、部署省心的技术博客，最后选了 Astro。
pubDate: 2026-09-20
tags: ["meta", "astro"]
---

试过 Hexo、Hugo，也想过直接手写 HTML，最后还是回到 **Astro**。原因很简单：

- 内容以 Markdown 存放，写作零负担，改文件 = 改文章；
- 默认不往浏览器塞 JS，首屏极轻；
- Content Collections 帮我把 frontmatter 校验成类型，字段写错构建时就报错；
- 一条命令就能部署到 GitHub Pages 或 Cloudflare Pages。

新增一篇文章只要往 `src/content/blog/` 丢一个 `.md`：

```markdown
---
title: 文章标题
description: 一句话摘要
pubDate: 2026-10-01
tags: ["java"]
---

正文写在这里，支持完整 Markdown 和代码块。
```

列表页、详情页、RSS 都会自动生成，不用手工维护导航。

> 下一步想加个标签页和阅读时长统计，等有空再折腾。
