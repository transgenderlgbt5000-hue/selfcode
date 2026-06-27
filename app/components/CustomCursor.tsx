'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  hue: number;
  size: number;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLCanvasElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let prevMouseX = -100;
    let prevMouseY = -100;
    let rafId = 0;
    let running = true;
    let idle = true;
    let lastMoveTime = 0;
    let lastEvent: MouseEvent | null = null;

    // Magnetic hover state
    let magnetTarget: DOMRect | null = null;
    let magnetStrength = 0;

    const trail = trailRef.current;
    const ctx = trail ? trail.getContext('2d') : null;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles: Particle[] = [];
    const MAX_PARTICLES = 80;
    const palette = [275, 325, 45]; // violet, pink, gold

    const resizeTrail = () => {
      if (!trail) return;
      trail.width = window.innerWidth * dpr;
      trail.height = window.innerHeight * dpr;
      trail.style.width = `${window.innerWidth}px`;
      trail.style.height = `${window.innerHeight}px`;
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeTrail();

    const render = () => {
      if (!running) return;

      // Calculate mouse velocity for dynamic smoothing
      const dx = mouseX - prevMouseX;
      const dy = mouseY - prevMouseY;
      const speed = Math.hypot(dx, dy);
      prevMouseX = mouseX;
      prevMouseY = mouseY;

      // Dynamic lerp: faster movement → quicker ring catch-up
      const baseLerp = 0.12;
      const speedBoost = Math.min(speed * 0.002, 0.22);
      const lerpFactor = baseLerp + speedBoost;

      // Update ring position with dynamic smoothing
      ringX += (mouseX - ringX) * lerpFactor;
      ringY += (mouseY - ringY) * lerpFactor;

      // Magnetic attraction on hover
      if (magnetTarget && magnetStrength > 0.01) {
        const cx = magnetTarget.left + magnetTarget.width / 2;
        const cy = magnetTarget.top + magnetTarget.height / 2;
        ringX += (cx - ringX) * magnetStrength;
        ringY += (cy - ringY) * magnetStrength;
        magnetStrength *= 0.92; // decay
      }

      // Dot follows mouse exactly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Ring with idle scale
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        if (idle) {
          const t = performance.now() * 0.001;
          const scale = 1 + Math.sin(t * 2.2) * 0.08;
          ringRef.current.style.setProperty('--ring-idle-scale', scale.toString());
        } else {
          ringRef.current.style.setProperty('--ring-idle-scale', '1');
        }
      }

      // Glow ring: slightly larger, softer, behind the main ring
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        if (idle) {
          const t = performance.now() * 0.001;
          const glowScale = 1.15 + Math.sin(t * 1.8 + 1) * 0.1;
          glowRef.current.style.setProperty('--glow-scale', glowScale.toString());
          glowRef.current.style.opacity = '0.55';
        } else {
          glowRef.current.style.setProperty('--glow-scale', '1');
          glowRef.current.style.opacity = speed > 3 ? '0.35' : '0.15';
        }
      }

      // Particle emission — rate scales with mouse speed
      if (ctx && !idle) {
        const emitRate = Math.min(speed * 1.8, 12);
        const shouldEmit = speed > 1.5 && particles.length < MAX_PARTICLES;

        if (shouldEmit) {
          const count = Math.floor(emitRate);
          for (let i = 0; i < count && particles.length < MAX_PARTICLES; i++) {
            const angle = Math.random() * Math.PI * 2;
            const spread = Math.random() * speed * 0.15;
            particles.push({
              x: ringX + (Math.random() - 0.5) * 4,
              y: ringY + (Math.random() - 0.5) * 4,
              vx: Math.cos(angle) * spread * (Math.random() > 0.5 ? -1 : 1),
              vy: Math.sin(angle) * spread * (Math.random() > 0.5 ? -1 : 1),
              age: 0,
              life: 0.35 + Math.random() * 0.5,
              hue: palette[Math.floor(Math.random() * palette.length)],
              size: 1.8 + Math.random() * 3.2,
            });
          }
        }

        // Render particles
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.globalCompositeOperation = 'lighter';

        for (let i = particles.length - 1; i >= 0; i -= 1) {
          const p = particles[i];
          p.age += 1 / 60;
          const t = p.age / p.life;
          if (t >= 1) {
            particles.splice(i, 1);
            continue;
          }

          // Move particle outward with deceleration
          p.x += p.vx * (1 - t);
          p.y += p.vy * (1 - t);

          // Eased fade curve for smoother appearance
          const alpha = (1 - t) * (1 - t) * 0.7;
          const radius = p.size * (1 - t * 0.5);

          // Soft radial gradient for each particle
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
          grd.addColorStop(0, `hsla(${p.hue}, 100%, 82%, ${alpha})`);
          grd.addColorStop(0.35, `hsla(${p.hue}, 100%, 68%, ${alpha * 0.6})`);
          grd.addColorStop(0.7, `hsla(${p.hue}, 100%, 55%, ${alpha * 0.18})`);
          grd.addColorStop(1, `hsla(${p.hue}, 100%, 50%, 0)`);
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (ctx && idle) {
        // Fade out remaining particles when idle
        if (particles.length > 0) {
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
          ctx.globalCompositeOperation = 'lighter';
          for (let i = particles.length - 1; i >= 0; i -= 1) {
            const p = particles[i];
            p.age += 1 / 30; // age faster when idle
            const t = p.age / p.life;
            if (t >= 1) {
              particles.splice(i, 1);
              continue;
            }
            p.x += p.vx * (1 - t) * 0.3;
            p.y += p.vy * (1 - t) * 0.3;
            const alpha = (1 - t) * (1 - t) * 0.5;
            const radius = p.size * (1 - t * 0.6);
            ctx.fillStyle = `hsla(${p.hue}, 100%, 75%, ${alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }
      }

      rafId = requestAnimationFrame(render);
    };

    const handleMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      lastMoveTime = performance.now();

      // Wake from idle
      if (idle && ringRef.current) {
        idle = false;
        ringRef.current.classList.remove('custom-ring--idle');
        if (glowRef.current) glowRef.current.classList.remove('custom-glow--idle');
      }

      // Check for interactive targets + magnetic snap
      const target = event.target as HTMLElement | null;
      const interactiveEl = target?.closest('[data-cursor-target]') as HTMLElement | null;
      const isInteractive = !!interactiveEl;

      if (isInteractive && interactiveEl) {
        magnetTarget = interactiveEl.getBoundingClientRect();
        magnetStrength = 0.22;
      } else {
        magnetTarget = null;
      }

      setActive((prev) => (prev === isInteractive ? prev : isInteractive));
    };

    const checkIdle = () => {
      const now = performance.now();
      if (!idle && now - lastMoveTime > 160 && ringRef.current) {
        idle = true;
        ringRef.current.classList.add('custom-ring--idle');
        if (glowRef.current) glowRef.current.classList.add('custom-glow--idle');
        magnetTarget = null;
      }
      requestAnimationFrame(checkIdle);
    };
    requestAnimationFrame(checkIdle);

    const handleScroll = () => {
      if (lastEvent) {
        mouseX = lastEvent.clientX;
        mouseY = lastEvent.clientY;
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && lastEvent) {
        mouseX = lastEvent.clientX;
        mouseY = lastEvent.clientY;
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        ringX = mouseX;
        ringY = mouseY;
      }
    };

    const handleMoveTracked = (event: MouseEvent) => {
      lastEvent = event;
      handleMove(event);
    };

    document.addEventListener('mousemove', handleMoveTracked, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      handleScroll();
      resizeTrail();
    }, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    rafId = requestAnimationFrame(render);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', handleMoveTracked);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeTrail);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={`custom-cursor ${active ? 'custom-cursor--active' : ''}`} />
      <div ref={glowRef} className={`custom-glow ${active ? 'custom-glow--active' : ''}`} />
      <div ref={ringRef} className={`custom-ring ${active ? 'custom-ring--active' : ''}`} />
      <canvas ref={trailRef} className="custom-trail" aria-hidden="true" />
    </>
  );
}
