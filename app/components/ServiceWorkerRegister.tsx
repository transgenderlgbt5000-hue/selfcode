"use client";
import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!('serviceWorker' in navigator)) return;

    let refreshing = false;

    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then((reg) => {
        reg.addEventListener('updatefound', () => {
          const newSW = reg.installing;
          if (!newSW) return;
          newSW.addEventListener('statechange', () => {
            if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
              // 新内容已就绪，提示用户刷新
              try {
                if (confirm('检测到新版本，立即刷新以更新内容？')) window.location.reload();
              } catch {
                // ignore in non-interactive environments
              }
            }
          });
        });
      }).catch(() => {
        // 注册失败（可能在 dev 环境或不支持）
      });
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
  }, []);

  return null;
}
