'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: 'AI生成作品',
    category: 'AI创作',
    description: '基于生成模型创作出的艺术图像与视频，下面展示了实时动态链接，直接跳转到作品演示。',
    technologies: ['AI', '深度学习', '视觉生成'],
    link: '#ai-links',
    image: '🤖',
  },
  {
    id: 2,
    title: '社交媒体平台',
    category: 'Web应用',
    description: '具有用户认证、发帖、评论、点赞等功能的社交媒体平台。',
    technologies: ['Vue.js', 'Django', 'Redis'],
    link: '#',
    image: '👥',
  },
];

const aiWorks = [
  {
    id: 1,
    label: 'AI 视觉 · 风格探索',
    badge: '豆包AI生成模特写真节选集',
    description: '使用豆包AI生成的高质量模特写真合集，展示AI在时尚摄影领域的创造力与应用潜力。',
    link: 'https://v.douyin.com/o95gW4ESaZo/',
  },
  {
    id: 2,
    label: 'AI 视觉 · 氛围短片',
    badge: '豆包AI生成粉嫩写真节选集',
    description: '使用豆包AI生成的粉嫩风格写真合集，柔和色调与细腻质感的唯美视觉呈现。',
    link: 'https://v.douyin.com/B8oX05LOozE/',
  },
  {
    id: 3,
    label: 'AI 视觉 · 交互灵感',
    badge: '交互演示',
    description: '现代视觉与交互灵感演示。',
    link: 'https://v.douyin.com/zoJYkbrXVvM/',
  },
  {
    id: 4,
    label: 'AI 视觉 · 动态演绎',
    badge: '个人前期AIGC长视频第一集',
    description: '个人早期AIGC长视频作品第一集，以日本武士为主题，探索AI生成技术在叙事短片中的应用。',
    link: 'https://v.douyin.com/f19_rQJQhog/',
  },
  {
    id: 5,
    label: 'AI 视觉 · 品牌升级',
    badge: '个人前期AIGC长视频第二集',
    description: '个人早期AIGC长视频作品第二集，在日本武士主题基础上融入超级英雄科幻元素，展现AI跨风格叙事能力。',
    link: 'https://v.douyin.com/HK99QCzGibE/',
  },
];

const unfinishedMaterials = [
  { id: 1, title: '素材 01', subtitle: 'AI 素材 / 视觉样片', image: '/images/1775197152408.png' },
  { id: 2, title: '素材 02', subtitle: 'AI 素材 / 视觉样片', image: '/images/1775226812566.png' },
  { id: 3, title: '素材 03', subtitle: 'AI 素材 / 视觉样片', image: '/images/1775299226347.png' },
  { id: 4, title: '素材 04', subtitle: 'AI 素材 / 视觉样片', image: '/images/1775375772785.png' },
  { id: 5, title: '素材 05', subtitle: 'AI 素材 / 视觉样片', image: '/images/1775376154201.png' },
  { id: 6, title: '素材 06', subtitle: 'AI 素材 / 视觉样片', image: '/images/1775379212316.png' },
  { id: 7, title: '素材 07', subtitle: 'AI 素材 / 视觉样片', image: '/images/1781199275228.png' },
  { id: 8, title: '素材 08', subtitle: 'AI 素材 / 视觉样片', image: '/images/1782016395723.png' },
  { id: 9, title: '素材 09', subtitle: 'AI 素材 / 视觉样片', image: '/images/1782016733320.png' },
  { id: 10, title: '素材 10', subtitle: 'AI 素材 / 视觉样片', image: '/images/IMG_20260611_122424.png' },
  { id: 11, title: '素材 11', subtitle: 'AI 素材 / 视觉样片', image: '/images/kling_20260405_作品_真人写实风_单独提取_5281_1.png' },
];

// Four emotional palettes, each lasting 30s.
// The last entry mirrors #0 so the loop back into the first palette is seamless.
const PALETTES = [
  { name: '欲望', a: [255, 92, 168], b: [255, 196, 102], c: [138, 92, 255], bg: [16, 6, 22] },
  { name: '愤怒', a: [220, 32, 38], b: [120, 12, 18], c: [10, 4, 8], bg: [6, 2, 4] },
  { name: '悲伤', a: [38, 90, 168], b: [128, 188, 230], c: [255, 196, 96], bg: [10, 16, 28] },
  { name: '欲望', a: [255, 92, 168], b: [255, 196, 102], c: [138, 92, 255], bg: [16, 6, 22] },
];


function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

export default function Portfolio() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;
    let rafId = 0;
    const startTime = performance.now();
    const PHASE_MS = 30000;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const blobs = [
      { cx: 0.3, cy: 0.3, rx: 0.22, ry: 0.18, vx: 0.35, vy: 0.27, phase: 0,   size: 0.55, channel: 'a' as const },
      { cx: 0.7, cy: 0.4, rx: 0.28, ry: 0.22, vx: 0.42, vy: 0.31, phase: 2.1, size: 0.50, channel: 'b' as const },
      { cx: 0.5, cy: 0.7, rx: 0.25, ry: 0.20, vx: 0.30, vy: 0.38, phase: 4.2, size: 0.48, channel: 'c' as const },
    ];

    const draw = (now: number) => {
      const t = now - startTime;
      const phaseFloat = t / PHASE_MS;
      const idx = Math.floor(phaseFloat) % PALETTES.length;
      const next = (idx + 1) % PALETTES.length;
      const raw = phaseFloat - Math.floor(phaseFloat);
      // hold ~80% of the time, ease transition in the last 20%
      const transition = Math.min(1, Math.max(0, (raw - 0.8) / 0.2));
      const ease = transition * transition * (3 - 2 * transition);
      const cur = PALETTES[idx];
      const nxt = PALETTES[next];

      ctx.globalCompositeOperation = 'source-over';

      // Safety: avoid runtime crash if palette data is unexpectedly missing.
      const curBg = cur?.bg ?? [16, 6, 22];
      const nxtBg = nxt?.bg ?? [16, 6, 22];

      const bgR = lerp(curBg[0], nxtBg[0], ease);
      const bgG = lerp(curBg[1], nxtBg[1], ease);
      const bgB = lerp(curBg[2], nxtBg[2], ease);
      ctx.fillStyle = `rgb(${bgR}, ${bgG}, ${bgB})`;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';
      for (const b of blobs) {
        const ox = Math.sin((t / 1000) * b.vx + b.phase) * b.rx;
        const oy = Math.cos((t / 1000) * b.vy + b.phase) * b.ry;
        const px = (b.cx + ox) * w;
        const py = (b.cy + oy) * h;
        const radius = b.size * Math.min(w, h);
        const breath = 1 + Math.sin((t / 1000) * 1.2 + b.phase) * 0.12;
        const r = radius * breath;

        const curChannel = cur?.[b.channel];
        const nextChannel = nxt?.[b.channel];

        const c1 = curChannel ?? [255, 92, 168];
        const c2 = nextChannel ?? [255, 92, 168];

        const r0 = lerp(c1[0], c2[0], ease);
        const g0 = lerp(c1[1], c2[1], ease);
        const b0 = lerp(c1[2], c2[2], ease);

        const grd = ctx.createRadialGradient(px, py, 0, px, py, r);
        grd.addColorStop(0,   `rgba(${r0}, ${g0}, ${b0}, 0.85)`);
        grd.addColorStop(0.4, `rgba(${r0}, ${g0}, ${b0}, 0.30)`);
        grd.addColorStop(1,   `rgba(${r0}, ${g0}, ${b0}, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'overlay';
      ctx.fillStyle = 'rgba(255,255,255,0.02)';
      ctx.fillRect(0, 0, w, h);

      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* dynamic emotion-driven background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">作品集</h1>
          <p className="text-xl text-pink-100/85 max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
            这里展示了我最新的 AI 生成作品，以及一个保留的社交媒体平台设计。
          </p>
        </section>

        <section className="mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-2 rounded-full bg-pink-500 text-white font-semibold shadow-lg shadow-pink-500/30 transition" data-ripple>
              全部
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#130614]/70 border border-pink-700/20 rounded-3xl overflow-hidden shadow-[0_25px_100px_-60px_rgba(255,140,188,0.65)] backdrop-blur-md transition hover:-translate-y-1"
            >
              <div className="h-56 bg-gradient-to-br from-pink-500 via-pink-300 to-[#ffd47f] flex items-center justify-center text-8xl">
                {project.image}
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sm uppercase tracking-[0.22em] text-pink-100/85 mb-4">{project.category}</p>
                <p className="text-pink-100/85 mb-6">{project.description}</p>
                <div className="mb-6">
                  <p className="text-sm font-semibold text-pink-100 mb-3">技术栈：</p>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="bg-white/10 text-pink-100 text-xs px-3 py-2 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href={project.link}
                  data-ripple
                  className="inline-block bg-pink-500 hover:bg-pink-400 text-white px-6 py-3 rounded-full font-semibold transition"
                >
                  查看详情
                </Link>
              </div>
            </div>
          ))}
        </section>

        <section id="ai-links" className="mb-12">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-pink-100/70">AI生成作品链接</p>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">动态演示列表</h2>
            <p className="mt-3 text-pink-100/75 max-w-2xl mx-auto">
              这些链接展示了 AI 生成的视觉演示风格，用户体验沉浸式场景与现代动效风格。
            </p>
          </div>

          <div className="space-y-4">
            {aiWorks.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-[2rem] border border-pink-400/15 bg-[#0f0610]/70 backdrop-blur-md p-6 transition hover:border-pink-300/40 hover:bg-[#190a19]/80"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-sm uppercase tracking-[0.35em] text-pink-100/65">{item.label}</div>
                    <div className="mt-2 text-xl font-semibold text-white">{item.badge}</div>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-pink-300/20 bg-pink-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-pink-100 transition group-hover:bg-pink-500/15">
                    立即跳转
                  </span>
                </div>
                <p className="mt-4 text-pink-100/80">{item.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section id="unfinished-materials" className="mb-12">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-pink-100/70">未完成项目素材节选</p>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">视觉素材直观预览</h2>
            <p className="mt-3 text-pink-100/75 max-w-2xl mx-auto">
              这里直接展示素材图，用户一眼即可看到作品风格。以下内容为当前节选素材，后续可替换为真实项目素材。
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {unfinishedMaterials.map((item) => (
              <div key={item.id} className="group overflow-hidden rounded-[2rem] border border-pink-400/20 bg-[#120618]/80 backdrop-blur-md shadow-[0_26px_90px_-50px_rgba(255,118,196,0.55)] transition hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <Image src={item.image} alt={item.title} width={600} height={400} unoptimized className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 to-transparent px-5 py-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-pink-100/70">{item.subtitle}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-pink-100/75">
            <span className="rounded-full border border-pink-300/20 bg-white/5 px-4 py-2">共 {unfinishedMaterials.length} 条素材</span>
            <span className="rounded-full border border-pink-300/20 bg-white/5 px-4 py-2">高清可视化预览</span>
            <span className="rounded-full border border-pink-300/20 bg-white/5 px-4 py-2">后续可替换为真实照片</span>
          </div>
        </section>

        <section className="text-center bg-white/5 backdrop-blur-md rounded-3xl p-12 shadow-[0_30px_100px_-60px_rgba(255,140,188,0.55)]">
          <div className="text-6xl font-bold mb-2 text-pink-100">1+</div>
          <p className="text-sm uppercase tracking-[0.24em] text-pink-100/80">年工作经验</p>
        </section>

        <section className="text-center py-12">
          <Link
            href="/contact"
            data-ripple
            className="inline-block bg-pink-500 hover:bg-pink-400 text-white px-8 py-3 rounded-full font-semibold transition"
          >
            联系我
          </Link>
        </section>
      </div>
    </div>
  );
}
