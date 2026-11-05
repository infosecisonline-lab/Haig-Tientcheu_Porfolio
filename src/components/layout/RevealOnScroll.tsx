"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Staggered entrances for [data-reveal] elements. Only elements that start below the fold are
// hidden, and only once this script runs, so content is never lost without JavaScript.
export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add("reveal-in");
          el.classList.remove("reveal-pending");
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    for (const el of els) {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add("reveal-pending");
        io.observe(el);
      }
    }
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
