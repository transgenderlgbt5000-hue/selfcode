'use client';

import { useEffect, useRef, useState } from 'react';
import { createNoise2D } from 'simplex-noise';

interface Star {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  hue: number;
}

interface Streak {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  age: number;
  hue: number;
  length: number;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ── Galaxy background ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;
    let rafId = 0;

    // ── Pre-render Milky Way barred spiral onto an offscreen canvas ──
    const noise2D = createNoise2D();
    const galaxySize = 1024;
    const offscreen = document.createElement('canvas');
    offscreen.width = galaxySize;
    offscreen.height = galaxySize;
    const gctx = offscreen.getContext('2d')!;

    const cx = galaxySize / 2;
    const cy = galaxySize / 2;
    const maxR = galaxySize / 2;

    // Bar parameters
    const barHalfLength = maxR * 0.35;
    const barHalfWidth = maxR * 0.07;
    const barAngle = 0.35; // slight tilt like real barred spirals

    // Color mapping
    const getColor = (dist: number, maxDist: number): string => {
      const t = dist / maxDist;
      if (t < 0.06) return `hsla(50, 90%, 88%, ${1 - t * 3})`;
      if (t < 0.22) return `hsla(${48 - t * 180}, 90%, 70%, 0.82)`;
      if (t < 0.50) return `hsla(${330 - (t - 0.22) * 130}, 85%, 62%, ${0.65 - t * 0.4})`;
      return `hsla(${265 - (t - 0.5) * 40}, 80%, 50%, ${0.38 - t * 0.4})`;
    };

    const PARTICLE_COUNT = 3200;
    const MAIN_ARMS = 2;
    const ARM_TWIST = 5.8;
    const ARM_WIDTH = 0.35;

    // Helper: rotate point around center
    const rotate = (px: number, py: number, angle: number) => ({
      x: cx + (px - cx) * Math.cos(angle) - (py - cy) * Math.sin(angle),
      y: cy + (px - cx) * Math.sin(angle) + (py - cy) * Math.cos(angle),
    });

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      let px: number, py: number;
      const t = i / PARTICLE_COUNT;

      if (t < 0.45) {
        // ── Bar: dense elongated core ──
        const bx = cx + (Math.random() - 0.5) * barHalfLength * 2;
        const by = cy + (Math.random() - 0.5) * barHalfWidth * 2;
        // Gaussian falloff for smooth bar edges
        const dx = (bx - cx) / barHalfLength;
        const dy = (by - cy) / barHalfWidth;
        if (dx * dx + dy * dy > 1) { i--; continue; } // reject outside ellipse
        ({ x: px, y: py } = rotate(bx, by, barAngle));
      } else if (t < 0.92) {
        // ── Spiral arms from bar ends ──
        const armIdx = (i % MAIN_ARMS);
        const side = armIdx === 0 ? 1 : -1;
        const rawR = Math.pow(Math.random(), 0.5) * (maxR - barHalfLength) + barHalfLength * 0.7;
        const spiralAngle = (rawR - barHalfLength * 0.7) / maxR * ARM_TWIST * Math.PI * 2;
        const baseAngle = barAngle + (side > 0 ? 0 : Math.PI);
        const theta = baseAngle + spiralAngle;

        // Noise scatter
        const nx = (cx + Math.cos(theta) * rawR) / galaxySize;
        const ny = (cy + Math.sin(theta) * rawR) / galaxySize;
        const noiseR = noise2D(nx * 3.5, ny * 3.5) * 0.3;
        const noiseA = noise2D(nx * 5 + 10, ny * 5 + 10) * ARM_WIDTH;
        const sr = rawR + noiseR * maxR * 0.07;
        const st = theta + noiseA;

        px = cx + Math.cos(st) * sr;
        py = cy + Math.sin(st) * sr;
      } else {
        // ── Scattered halo stars ──
        const angle = Math.random() * Math.PI * 2;
        const r = Math.pow(Math.random(), 0.6) * maxR * 1.1;
        px = cx + Math.cos(angle) * r;
        py = cy + Math.sin(angle) * r;
      }

      const dist = Math.hypot(px - cx, py - cy);
      const color = getColor(dist, maxR);
      const alpha = dist < barHalfLength * 0.5
        ? 0.5 + Math.random() * 0.5
        : Math.max(0.03, 1 - (dist / maxR) * 0.9) * (0.3 + Math.random() * 0.7);
      const size = 0.25 + (1 - dist / maxR) * 2.2 + Math.random() * 1;

      gctx.fillStyle = color;
      gctx.globalAlpha = alpha;
      gctx.beginPath();
      gctx.arc(px, py, size, 0, Math.PI * 2);
      gctx.fill();
    }

    // Central bulge glow
    const bulgeGrd = gctx.createRadialGradient(cx, cy, 0, cx, cy, barHalfLength * 0.6);
    bulgeGrd.addColorStop(0, 'rgba(255, 242, 220, 0.85)');
    bulgeGrd.addColorStop(0.2, 'rgba(255, 200, 170, 0.4)');
    bulgeGrd.addColorStop(0.5, 'rgba(255, 140, 160, 0.1)');
    bulgeGrd.addColorStop(1, 'transparent');
    gctx.fillStyle = bulgeGrd;
    gctx.globalAlpha = 1;
    gctx.fillRect(cx - barHalfLength * 0.6, cy - barHalfLength * 0.6, barHalfLength * 1.2, barHalfLength * 1.2);

    gctx.globalCompositeOperation = 'lighter';

    // ── Setup foreground stars ──
    const starPalette = [275, 325, 220, 45, 330];
    const stars: Star[] = Array.from({ length: 140 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      baseAlpha: Math.random() * 0.5 + 0.2,
      twinkleSpeed: Math.random() * 2.2 + 0.8,
      twinkleOffset: Math.random() * Math.PI * 2,
      hue: starPalette[Math.floor(Math.random() * starPalette.length)],
    }));

    // ── Shooting streaks ──
    const streaks: Streak[] = [];
    const MAX_STREAKS = 4;
    let streakTimer = 0;

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

    const start = performance.now();

    const draw = (now: number) => {
      const t = (now - start) / 1000;

      // Deep space background
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#03010a';
      ctx.fillRect(0, 0, w, h);

      // Draw pre-rendered galaxy, slowly rotating
      const galaxyDisplaySize = Math.max(w, h) * 1.15;
      const gx = w / 2;
      const gy = h / 2;
      const rotation = t * 0.015; // slow rotation

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 0.72;
      ctx.translate(gx, gy);
      ctx.rotate(rotation);
      ctx.drawImage(
        offscreen,
        -galaxyDisplaySize / 2,
        -galaxyDisplaySize / 2,
        galaxyDisplaySize,
        galaxyDisplaySize,
      );
      ctx.restore();

      // Soft radial halo around galaxy
      const halo = ctx.createRadialGradient(gx, gy, galaxyDisplaySize * 0.1, gx, gy, galaxyDisplaySize * 0.55);
      halo.addColorStop(0, 'rgba(180, 120, 220, 0.08)');
      halo.addColorStop(0.5, 'rgba(100, 60, 160, 0.04)');
      halo.addColorStop(1, 'transparent');
      ctx.fillStyle = halo;
      ctx.globalAlpha = 0.8;
      ctx.fillRect(0, 0, w, h);

      // Foreground twinkling stars
      ctx.globalAlpha = 1;
      for (const s of stars) {
        const twinkle = Math.sin(t * s.twinkleSpeed + s.twinkleOffset) * 0.5 + 0.5;
        const alpha = s.baseAlpha * (0.5 + twinkle * 0.5);
        const hueShift = Math.sin(t * 0.4 + s.twinkleOffset) * 15;
        ctx.fillStyle = `hsla(${s.hue + hueShift}, 90%, 78%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        if (s.r > 1.1 && twinkle > 0.8) {
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3);
          glow.addColorStop(0, `hsla(${s.hue}, 100%, 85%, ${alpha * 0.45})`);
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Shooting stars
      streakTimer += 1 / 60;
      if (streakTimer > 2.5 + Math.random() * 3 && streaks.length < MAX_STREAKS) {
        streakTimer = 0;
        const angle = Math.random() * Math.PI * 0.5 - Math.PI * 0.25;
        const speed = 350 + Math.random() * 400;
        streaks.push({
          x: Math.random() * w * 0.6,
          y: Math.random() * h * 0.5,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0.7 + Math.random() * 0.6,
          age: 0,
          hue: starPalette[Math.floor(Math.random() * starPalette.length)],
          length: 60 + Math.random() * 100,
        });
      }

      for (let i = streaks.length - 1; i >= 0; i--) {
        const s = streaks[i];
        s.age += 1 / 60;
        const progress = s.age / s.life;
        if (progress >= 1) {
          streaks.splice(i, 1);
          continue;
        }
        s.x += s.vx * (1 / 60);
        s.y += s.vy * (1 / 60);

        const alpha = progress < 0.15 ? progress / 0.15 : (1 - progress) / 0.85;
        const tailX = s.x - (s.vx / Math.hypot(s.vx, s.vy)) * s.length * (1 - progress);
        const tailY = s.y - (s.vy / Math.hypot(s.vx, s.vy)) * s.length * (1 - progress);

        const grd = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grd.addColorStop(0, 'transparent');
        grd.addColorStop(0.5, `hsla(${s.hue}, 90%, 82%, ${alpha * 0.7})`);
        grd.addColorStop(1, `hsla(${s.hue}, 100%, 92%, ${alpha})`);
        ctx.strokeStyle = grd;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        ctx.fillStyle = `hsla(${s.hue}, 100%, 95%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Vignette
      ctx.globalCompositeOperation = 'source-over';
      const vignette = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.7);
      vignette.addColorStop(0, 'transparent');
      vignette.addColorStop(1, 'rgba(0,0,0,0.5)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 -z-10" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">联系我</h1>
          <p className="text-xl text-pink-100/85 max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
            有任何问题或建议？请随时与我联系。我会尽快回复您的邮件。
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-md border border-pink-400/20 p-8 rounded-3xl space-y-8 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">📧 邮箱</h3>
                <p className="text-pink-100/85">
                  <a href="mailto:3510295219@qq.com" className="text-pink-300 hover:text-pink-200 transition">
                    3510295219@qq.com
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">📱 电话</h3>
                <p className="text-pink-100/85">
                  <a href="tel:+8615683360572" className="text-pink-300 hover:text-pink-200 transition">
                    15683360572
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">📍 位置</h3>
                <p className="text-pink-100/85">中国 · 重庆</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-4">🔗 社交媒体</h3>
                <div className="space-y-2">
                  <a href="#" className="block text-pink-300 hover:text-pink-200 transition" data-ripple>GitHub</a>
                  <a href="#" className="block text-pink-300 hover:text-pink-200 transition" data-ripple>LinkedIn</a>
                  <a href="#" className="block text-pink-300 hover:text-pink-200 transition" data-ripple>Twitter</a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-md border border-pink-400/20 p-8 rounded-3xl shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-white mb-2">感谢您的留言！</h3>
                  <p className="text-pink-100/85">您的消息已成功发送。我会尽快与您联系。</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-pink-100 font-semibold mb-2">姓名 <span className="text-pink-400">*</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required
                      className="w-full px-4 py-3 bg-white/10 border border-pink-400/20 rounded-xl text-white placeholder-pink-100/40 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition"
                      placeholder="请输入您的姓名" />
                  </div>
                  <div>
                    <label className="block text-pink-100 font-semibold mb-2">邮箱 <span className="text-pink-400">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required
                      className="w-full px-4 py-3 bg-white/10 border border-pink-400/20 rounded-xl text-white placeholder-pink-100/40 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition"
                      placeholder="请输入您的邮箱" />
                  </div>
                  <div>
                    <label className="block text-pink-100 font-semibold mb-2">主题 <span className="text-pink-400">*</span></label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} required
                      className="w-full px-4 py-3 bg-white/10 border border-pink-400/20 rounded-xl text-white placeholder-pink-100/40 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition"
                      placeholder="请输入邮件主题" />
                  </div>
                  <div>
                    <label className="block text-pink-100 font-semibold mb-2">消息 <span className="text-pink-400">*</span></label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={5}
                      className="w-full px-4 py-3 bg-white/10 border border-pink-400/20 rounded-xl text-white placeholder-pink-100/40 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition resize-none"
                      placeholder="请输入您的消息"></textarea>
                  </div>
                  <button type="submit" data-ripple data-cursor-target
                    className="w-full bg-pink-500 hover:bg-pink-400 text-white font-semibold py-3 rounded-full transition shadow-lg shadow-pink-500/30">
                    发送消息
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <section className="bg-white/5 backdrop-blur-md border border-pink-400/20 rounded-3xl p-12 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]">
          <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">常见问题</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div><h3 className="text-lg font-bold text-white mb-2">您的响应时间是多少？</h3><p className="text-pink-100/85">通常我会在24小时内回复您的邮件。如果比较急，可以通过电话或微信联系我。</p></div>
            <div><h3 className="text-lg font-bold text-white mb-2">您接受哪些类型的项目？</h3><p className="text-pink-100/85">我接受各种类型的Web开发项目，包括新项目、现有项目改进和技术咨询。</p></div>
            <div><h3 className="text-lg font-bold text-white mb-2">项目估价需要多长时间？</h3><p className="text-pink-100/85">在了解项目需求后，我通常会在3-5个工作日内提供详细的估价方案。</p></div>
            <div><h3 className="text-lg font-bold text-white mb-2">您支持远程合作吗？</h3><p className="text-pink-100/85">当然，我完全支持远程合作，可以通过视频会议、邮件和项目管理工具进行沟通。</p></div>
          </div>
        </section>
      </div>
    </div>
  );
}
