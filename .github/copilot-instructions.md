# 个人主页和作品集网站 - 开发指南

这个项目是一个现代化的个人主页和作品集网站，使用 Next.js 和 React 构建。

## 项目概述

### 技术栈
- **框架**: Next.js 15+
- **UI**: React 19+
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **工具**: ESLint, PostCSS

### 核心功能
- 个人介绍和背景展示
- 技能和经验列表
- 作品集项目展示（支持按类别筛选）
- 联系表单和联系方式
- 响应式设计和移动适配

## 项目结构

```
selfcode/
├── app/
│   ├── components/              # 可复用组件
│   │   ├── Navbar.tsx          # 导航栏（支持移动菜单）
│   │   └── Footer.tsx          # 页脚
│   ├── about/                   # 关于页面 (/about)
│   │   └── page.tsx
│   ├── portfolio/               # 作品集页面 (/portfolio)
│   │   └── page.tsx
│   ├── contact/                 # 联系页面 (/contact)
│   │   └── page.tsx
│   ├── layout.tsx              # 根布局（包含导航和页脚）
│   ├── page.tsx                # 首页内容
│   └── globals.css             # 全局样式
├── public/                     # 静态资源目录
├── package.json
└── tailwind.config.ts          # Tailwind 配置文件
```

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器（http://localhost:3000）
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 运行 ESLint 检查
npm run lint
```

## 页面说明

### 首页 (/)
- **文件**: `app/page.tsx`
- **内容**: 欢迎信息、核心技能卡片、成就统计、行动号召
- **特点**: 吸引力强，引导用户浏览其他页面

### 关于我 (/about)
- **文件**: `app/about/page.tsx`
- **内容**: 个人背景、技能清单、工作经验、教育背景
- **特点**: 按时间线展示工作经验，分类展示技能

### 作品集 (/portfolio)
- **文件**: `app/portfolio/page.tsx`
- **内容**: 项目列表、分类筛选、项目详情
- **特点**: 支持按类别筛选项目，展示技术栈

### 联系我 (/contact)
- **文件**: `app/contact/page.tsx`
- **内容**: 联系表单、联系方式、常见问题
- **特点**: 交互式表单、多种联系方式、FAQ 模块

## 自定义指南

### 1. 修改个人信息

编辑各页面中的文本内容：

```typescript
// 例如在 app/page.tsx 中
<h1>欢迎来到我的个人主页</h1>
// 改为你的名字或标题
<h1>欢迎来到 [你的名字] 的个人主页</h1>
```

### 2. 更新作品集项目

在 `app/portfolio/page.tsx` 中修改 `projects` 数组：

```typescript
const projects = [
  {
    id: 1,
    title: '你的项目名称',
    category: '项目类别',
    description: '项目描述',
    technologies: ['技术1', '技术2'],
    link: '#',
    image: '🎯', // 表情符号
  },
  // 添加更多项目...
];
```

### 3. 修改样式

#### 修改颜色主题
在 `tailwind.config.ts` 中自定义颜色（如需要）：

```typescript
// 或者直接在组件中修改 Tailwind 类
<div className="bg-blue-600">  // 改为其他颜色如 bg-purple-600, bg-green-600
```

#### 修改布局间距
使用 Tailwind 的间距类（p-、m-、px-、py- 等）

### 4. 添加新页面

创建新目录和页面文件：

```bash
# 创建博客页面
mkdir app/blog
# 创建 app/blog/page.tsx
```

然后在 Navbar.tsx 中添加链接：

```typescript
<Link href="/blog" className="hover:text-blue-200 transition">
  博客
</Link>
```

### 5. 修改联系信息

在 `app/contact/page.tsx` 中更新：

```typescript
<a href="mailto:your-email@example.com">
  your-email@example.com
</a>
```

## 部署指南

### 部署到 Vercel（推荐）

1. 上传代码到 GitHub
2. 访问 [Vercel](https://vercel.com)
3. 点击"New Project"并导入 GitHub 仓库
4. 配置好后自动部署
5. 获得免费的 HTTPS 域名

### 部署到其他平台

- **Netlify**: 支持一键部署
- **GitHub Pages**: 静态导出部署
- **自建服务器**: 运行 `npm run build && npm start`

## 常见问题

### Q: 如何修改网站标题和描述？
A: 编辑 `app/layout.tsx` 中的 metadata：

```typescript
export const metadata: Metadata = {
  title: "你的网站标题",
  description: "你的网站描述",
};
```

### Q: 如何添加图片？
A: 将图片放在 `public/images` 目录，然后在代码中引用：

```typescript
import Image from 'next/image';
<Image src="/images/your-image.jpg" alt="描述" width={300} height={300} />
```

### Q: 如何添加社交媒体链接？
A: 在 `app/components/Footer.tsx` 中修改社交链接：

```typescript
<a href="https://github.com/yourprofile">GitHub</a>
<a href="https://linkedin.com/in/yourprofile">LinkedIn</a>
```

### Q: 开发时如何调试？
A: 使用浏览器开发者工具（F12）检查元素和控制台错误。

### Q: 如何处理表单提交？
A: 当前联系表单是本地处理。要实现真实提交，需要：
1. 创建 API 路由 (`app/api/contact.ts`)
2. 配置后端邮件服务
3. 修改表单提交逻辑

## 性能优化

- Next.js 自动代码分割
- Tailwind CSS 自动清除未使用的样式
- 图片优化通过 Next.js Image 组件
- 生产构建自动优化

## 安全性建议

- 不要在代码中暴露敏感信息
- 在生产环境中使用环境变量
- 验证和清理所有用户输入
- 定期更新依赖包

## 后续改进建议

- [ ] 添加博客功能
- [ ] 集成 CMS (如 Strapi、Sanity)
- [ ] 添加动画效果
- [ ] 实现黑暗模式
- [ ] 添加多语言支持
- [ ] 集成分析工具
- [ ] 优化 SEO

## 获取帮助

- Next.js 官方文档: https://nextjs.org/docs
- Tailwind CSS 文档: https://tailwindcss.com/docs
- React 文档: https://react.dev

## 许可证

MIT License - 自由使用和修改
