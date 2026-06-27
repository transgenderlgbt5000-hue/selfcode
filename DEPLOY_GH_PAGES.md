部署到 GitHub Pages（说明与注意事项）

概述

本项目基于 Next.js（App Router）。GitHub Pages 只支持静态托管，要部署到 GitHub Pages，必须使用 `next export` 将站点导出为静态文件（输出目录 `out`）。

重要限制

- 如果你的站点使用 SSR、API 路由、或动态运行时（Edge/Server Actions），`next export` 不支持这些功能，导出将失败或部分页面不可用。
- App Router 在某些 Next 版本下对 `next export` 支持有限，请先在本地测试 `npm run export` 是否成功。

步骤（本地部署 -> gh-pages 分支）

1. 本地生成静态文件

```bash
# 构建并导出静态站点
npm run export
# 会生成 out/ 目录
```

2. 本地部署到 GitHub Pages（使用 gh-pages）

```bash
# 将 out/ 推到 gh-pages 分支并发布
npm run deploy:gh
```

这会使用 `npx gh-pages -d out` 将 `out` 目录内容推送到 `gh-pages` 分支供 GitHub Pages 使用。

3. 在 GitHub 仓库中启用 GitHub Pages

- 进入仓库 Settings → Pages，选择 Source 为 `gh-pages` 分支（或 Pages UI 选择 gh-pages）。
- 确认 URL（通常为 `https://<USERNAME>.github.io/<REPO>/`）。

自定义域

- 如果你想使用自定义域（例如 `weyn2005.com`），请在仓库 Pages 设置中添加自定义域，并在你的域名注册商处添加对应的 DNS 记录（A 或 CNAME，GitHub 会给出具体值）。
- 注意：自定义域名需要你拥有并配置 DNS，GitHub 本身不收费，但域名一般需付费购买。

测试与验证

- 在部署后访问 Pages 提供的 URL，确认页面、静态资源、PWA manifest、sw.js（注意：Service Worker 需在根路径且通过静态部署正确暴露）是否正常工作。
- 若 `sw.js` 未被正确加载，检查 `out/sw.js` 是否存在并且在站点根路径可访问。

回退建议（若 `next export` 不可用）

- 使用 Vercel 免费方案部署（自动支持 Next.js 的所有特性），URL 为 `*.vercel.app`，支持自定义域绑定和自动 HTTPS，部署更简单可靠。

常见问题

- Q: 我的 `npm run export` 失败了怎么办？
  A: 说明此项目使用了不支持静态导出的功能。建议使用 Vercel 或 Netlify 的 Next.js 支持进行部署，或重构为完全静态站点。

- Q: 我不想购买域名，如何共享链接？
  A: 使用 GitHub Pages 自带的 `https://<username>.github.io/<repo>/` 子域即可，完全免费。

---

需要我代为执行的步骤

- 我可以把仓库推送到 GitHub（需要你提供仓库权限或让我创建仓库的授权），并在你的授权下运行 `npm run deploy:gh` 来发布。或者我可以只给你一套可复制的命令，你手动运行。
