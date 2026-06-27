'use client';

import { useEffect } from 'react';

export default function RippleProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const button = target.closest('[data-ripple]') as HTMLElement | null;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;
      const offsetX = event.clientX - rect.left - radius;
      const offsetY = event.clientY - rect.top - radius;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${offsetX}px`;
      circle.style.top = `${offsetY}px`;
      circle.className = 'ripple-effect';

      const existingRipple = button.querySelector('.ripple-effect');
      if (existingRipple) existingRipple.remove();

      button.appendChild(circle);

      window.setTimeout(() => {
        circle.remove();
      }, 500);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return <>{children}</>;
}
