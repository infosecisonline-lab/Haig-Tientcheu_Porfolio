"use client";

import { useEffect, useRef } from "react";

// Muted product loop; it stays on its poster frame for visitors who ask for reduced motion.
export function WorkVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    // Play only while on screen to save battery and data.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} />
  );
}
