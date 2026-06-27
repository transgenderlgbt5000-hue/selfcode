'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="bg-[#09040a]/95 border-b border-pink-400/10 backdrop-blur-xl shadow-[0_24px_90px_-60px_rgba(255,90,182,0.8)]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-[0.22em] text-pink-100">
            文 | Wayne
          </Link>

          <div className="hidden md:flex items-center gap-8 text-pink-100/80">
            <Link href="/" className="hover:text-white transition">
              首页
            </Link>
            <Link href="/about" className="hover:text-white transition">
              关于我
            </Link>
            <Link href="/portfolio" className="hover:text-white transition">
              作品集
            </Link>
            <Link href="/contact" className="text-[0.65rem] opacity-40 hover:opacity-90 transition tracking-[0.45em] lowercase">
              联系我
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-pink-300/15 bg-white/5 text-pink-100 transition hover:border-pink-200/50"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 pt-3 space-y-2 text-pink-100/80">
            <Link href="/" className="block rounded-2xl px-4 py-3 hover:bg-white/10 transition">
              首页
            </Link>
            <Link href="/about" className="block rounded-2xl px-4 py-3 hover:bg-white/10 transition">
              关于我
            </Link>
            <Link href="/portfolio" className="block rounded-2xl px-4 py-3 hover:bg-white/10 transition">
              作品集
            </Link>
            <Link href="/contact" className="block rounded-2xl px-4 py-3 text-[0.72rem] uppercase tracking-[0.3em] hover:bg-white/10 transition">
              联系我
            </Link>
          </div>
        )}
      </div>
    </motion.nav>
  );
}
