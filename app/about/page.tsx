'use client';

import { useEffect, useRef } from 'react';

export default function About() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const skills = [
    { category: '前端技术', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'] },
    { category: '后端技术', items: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB'] },
    { category: '其他工具', items: ['ChatGPT', '即梦', '豆包', '可灵', 'Gemini', 'grok'] },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;
    let rafId = 0;

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

    type Blob = {
      cx: number; cy: number;
      rx: number; ry: number;
      vx: number; vy: number;
      phase: number;
      size: number;
      hue: number;
    };
    const blobs: Blob[] = [
      { cx: 0.3, cy: 0.3, rx: 0.22, ry: 0.18, vx: 0.35, vy: 0.27, phase: 0,    size: 0.55, hue: 215 },
      { cx: 0.7, cy: 0.4, rx: 0.28, ry: 0.22, vx: 0.42, vy: 0.31, phase: 2.1,  size: 0.50, hue: 330 },
      { cx: 0.5, cy: 0.7, rx: 0.25, ry: 0.20, vx: 0.30, vy: 0.38, phase: 4.2,  size: 0.48, hue: 25  },
    ];

    const start = performance.now();
    const draw = (now: number) => {
      const t = (now - start) / 1000;

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#06030d';
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';
      for (const b of blobs) {
        const ox = Math.sin(t * b.vx + b.phase) * b.rx;
        const oy = Math.cos(t * b.vy + b.phase) * b.ry;
        const px = (b.cx + ox) * w;
        const py = (b.cy + oy) * h;
        const radius = b.size * Math.min(w, h);
        const breath = 1 + Math.sin(t * 1.2 + b.phase) * 0.12;
        const r = radius * breath;

        const grd = ctx.createRadialGradient(px, py, 0, px, py, r);
        grd.addColorStop(0,   `hsla(${b.hue}, 95%, 62%, 0.85)`);
        grd.addColorStop(0.4, `hsla(${b.hue}, 95%, 60%, 0.30)`);
        grd.addColorStop(1,   `hsla(${b.hue}, 95%, 55%, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const b of blobs) {
        const ox = Math.sin(t * (b.vx * 1.6) + b.phase + 1.0) * (b.rx * 0.5);
        const oy = Math.cos(t * (b.vy * 1.6) + b.phase + 1.0) * (b.ry * 0.5);
        const px = (b.cx + ox) * w;
        const py = (b.cy + oy) * h;
        const r = b.size * Math.min(w, h) * 0.35;
        const grd = ctx.createRadialGradient(px, py, 0, px, py, r);
        grd.addColorStop(0,   `hsla(${b.hue}, 100%, 78%, 0.55)`);
        grd.addColorStop(1,   `hsla(${b.hue}, 100%, 70%, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }

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
      {/* dynamic nightclub-style background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10"
        aria-hidden="true"
      />
      {/* soft vignette to keep text readable */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.45) 100%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <section className="mb-16">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            关于我
          </h1>
          <p className="text-xl text-pink-100/90 max-w-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            我是一名AI爱好者，欢迎来到我的个人网站。
          </p>
        </section>

        {/* Background */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            背景与经历
          </h2>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]">
            <p className="text-pink-100/90 mb-4 leading-relaxed">
              我从重庆工业职业技术学院的物联网应用技术专业毕业。
            </p>
            <p className="text-pink-100/90 leading-relaxed">
              我相信持续学习和进步是成功的关键。
            </p>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            核心技能
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl shadow-[0_25px_70px_-30px_rgba(0,0,0,0.6)] hover:bg-white/10 transition"
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill, idx) => (
                    <li key={idx} className="text-pink-100/90 flex items-center">
                      <span className="w-2 h-2 bg-pink-400 rounded-full mr-3 shadow-[0_0_8px_rgba(255,150,200,0.8)]"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            工作经验
          </h2>
          <div className="space-y-8">
            {[
              { title: '资深前端工程师', period: '科技公司 | 2022 - 至今', desc: '负责React应用的开发和维护，带领团队实现了多个重要功能，提升了页面加载速度30%。' },
              { title: '全栈开发工程师', period: '初创公司 | 2020 - 2022', desc: '从零开始构建了公司的核心Web应用，使用React和Node.js，用户数增长到10万+。' },
              { title: '前端开发工程师', period: '互联网公司 | 2018 - 2020', desc: '参与了多个项目的前端开发，积累了丰富的实战经验，获得了多项技术创新奖。' },
            ].map((job, i) => (
              <div
                key={i}
                className="rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-8 shadow-[0_25px_70px_-30px_rgba(0,0,0,0.6)] hover:bg-white/10 transition"
              >
                <h3 className="text-xl font-bold text-white">{job.title}</h3>
                <p className="text-pink-100/70 text-sm mb-2">{job.period}</p>
                <p className="text-pink-100/90 leading-relaxed">{job.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            教育背景
          </h2>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-[0_25px_70px_-30px_rgba(0,0,0,0.6)]">
            <h3 className="text-xl font-bold text-white mb-2">
              全日制大专
            </h3>
            <p className="text-pink-100/70 mb-2">重庆工业职业技术学院 | 2025年毕业</p>
            <p className="text-pink-100/90 leading-relaxed">
              物联网应用技术专业，在校期间主修Web开发与软件工程相关课程。
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
