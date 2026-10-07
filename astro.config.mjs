// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages 用户主页，根路径，无需设 base
export default defineConfig({
  site: 'https://luobin20000827.github.io',
  // 若以后改成项目页 (username.github.io/repo)，取消注释并填仓库名：
  // base: '/repo',
  trailingSlash: 'never',
  integrations: [sitemap()],
});
