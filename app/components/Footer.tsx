import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: '首页' },
    { href: '/about', label: '关于我' },
    { href: '/portfolio', label: '作品集' },
    { href: '/contact', label: '联系我' },
  ];

  const socialLinks = [
    { href: '#', label: 'GitHub' },
    { href: '#', label: 'LinkedIn' },
    { href: '#', label: 'Twitter' },
  ];

  return (
    <footer
      role="contentinfo"
      aria-label="页面底部"
      className="bg-[#050308] text-pink-100 mt-16 border-t border-pink-400/10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 md:grid-cols-3 mb-8">
          <div>
            <h3 className="text-pink-100 font-semibold mb-4">关于</h3>
            <p className="text-sm text-pink-100/70">
              文 | Wayne 的个人介绍与作品集，融合黑粉金质感与现代动效，呈现更高级的品牌形象。
            </p>
          </div>

          <nav aria-label="快速链接">
            <h3 className="text-pink-100 font-semibold mb-4">快速链接</h3>
            <ul className="text-sm space-y-2 text-pink-100/70">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="社交链接">
            <h3 className="text-pink-100 font-semibold mb-4">关注我</h3>
            <ul className="text-sm space-y-2 text-pink-100/70">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    aria-label={`${link.label} 链接（在新窗口打开）`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="text-center text-sm text-pink-100/60">
          © {currentYear} 文 | Wayne 个人介绍与作品集。保留所有权利。
        </div>
      </div>
    </footer>
  );
}
