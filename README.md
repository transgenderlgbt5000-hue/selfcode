# 个人主页和作品集网站

一个现代化的个人主页和作品集网站，使用 Next.js 和 React 构建。

## 项目特性

- ✨ 现代化设计，响应式布局
- 🎨 使用 Tailwind CSS 进行样式定制
- 📱 完全移动友好
- ⚡ 快速加载，优化性能
- 📝 个人介绍页面
- 💼 作品集展示
- 📊 技能和经验展示
- 📬 联系表单
- 🔍 SEO 友好

## 项目结构

```
selfcode/
├── app/
│   ├── components/          # 可复用组件
│   │   ├── Navbar.tsx      # 导航栏
│   │   └── Footer.tsx      # 页脚
│   ├── about/              # 关于页面
│   │   └── page.tsx
│   ├── portfolio/           # 作品集页面
│   │   └── page.tsx
│   ├── contact/             # 联系页面
│   │   └── page.tsx
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页
│   └── globals.css         # 全局样式
├── public/                 # 静态资源
├── package.json
└── tailwind.config.ts      # Tailwind 配置
```

## 技术栈

- **框架**: Next.js 15+
- **UI 库**: React 19+
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **工具**: ESLint, PostCSS

## 快速开始

### 安装依赖

```bash
npm install
```

### 运行开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
npm run build
npm start
```

## 页面说明

### 首页 (/)
展示个人信息概览、核心技能和成就统计。

### 关于我 (/about)
详细介绍个人背景、工作经验、教育背景和核心技能。

### 作品集 (/portfolio)
展示过往项目，支持按类别筛选，包含项目描述和技术栈。

### 联系我 (/contact)
提供联系表单、联系方式和常见问题解答。

## 自定义说明

1. **修改个人信息**: 编辑各页面中的文本内容
2. **更换图片**: 将图片放在 `public/images` 目录
3. **修改颜色**: 编辑 `tailwind.config.ts` 或在组件中修改颜色类
4. **添加项目**: 在 `app/portfolio/page.tsx` 中添加项目数据

## 部署

### 部署到 Vercel (推荐)

1. 上传代码到 GitHub
2. 访问 [Vercel](https://vercel.com)
3. 导入 GitHub 项目
4. 自动部署即可

### 部署到其他平台

支持部署到任何支持 Node.js 的平台，如 Netlify、GitHub Pages、AWS 等。

## 许可证

MIT License - 随意使用和修改

## 联系方式

如有问题或建议，欢迎联系。
