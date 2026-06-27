'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.1, ease: 'easeOut' }}
      className="relative min-h-screen overflow-hidden hero-shell"
    >
      <div className="absolute inset-0 hero-glow-ring pointer-events-none" />
      <div className="absolute inset-0 hero-grid pointer-events-none" />
      <div className="absolute inset-0 hero-scanlines pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-90">
        <ParticleBackground />
      </div>
      {/* ambient haze */}
      <div className="absolute inset-0 hero-haze pointer-events-none" />

      <div className="relative z-10 mx-auto flex min-h-screen flex-col justify-center px-6 py-24 sm:px-10 lg:px-12">
        <motion.section
          className="relative text-center"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
        >
          <div className="mb-6 text-[0.72rem] uppercase tracking-[0.58em] text-pink-100/70">
            文 | Wayne • 个人介绍与作品集
          </div>

          <div className="relative mx-auto mb-10 inline-flex items-center justify-center overflow-hidden rounded-[2.4rem] border border-pink-200/20 bg-black/25 px-6 py-3 shadow-[0_0_120px_rgba(255,103,181,0.12)] backdrop-blur-sm">
            <span className="uppercase tracking-[0.5em] text-[0.72rem] text-pink-100/70">
              modern cinematic entrance
            </span>
          </div>

          <div className="relative mx-auto mb-12 max-w-5xl">
            <h1 className="hero-title hero-title--gold relative z-10 text-[clamp(5rem,12vw,9rem)] font-black">
              文 | Wayne
            </h1>
            <div className="absolute inset-x-0 top-1/2 h-1 bg-gradient-to-r from-transparent via-amber-300/70 to-transparent blur-xl" />
          </div>

          <p className="mx-auto mb-14 max-w-3xl text-base md:text-xl leading-8 text-pink-100/78">
            欢迎来到我的个人网站。
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <Link
              href="/portfolio"
              data-ripple
              data-cursor-target
              className="group relative overflow-hidden rounded-full border border-pink-300/30 bg-[#13040e]/85 px-8 py-3 text-white font-semibold shadow-[0_18px_80px_-42px_rgba(255,85,184,0.75)] transition hover:border-pink-200/70 hover:bg-[#1c0819]"
            >
              <span className="relative z-10">查看作品集</span>
              <span className="button-highlight" />
            </Link>
            <Link
              href="/contact"
              data-ripple
              data-cursor-target
              className="relative inline-flex items-center rounded-full border border-gold-300/30 bg-[#160613]/88 px-7 py-3 text-sm uppercase tracking-[0.3em] text-pink-100/85 transition hover:border-gold-200/80 hover:text-white"
            >
              联系我
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-4 text-[0.72rem] uppercase tracking-[0.34em] text-pink-100/60">
            <span className="badge">动态背景</span>
            <span className="badge">交互光标</span>
            <span className="badge">现代视觉</span>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
