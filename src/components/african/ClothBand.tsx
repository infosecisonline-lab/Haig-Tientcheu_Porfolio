"use client";

import { useEffect, useRef } from "react";
import { CLOTH_LENGTH, clothStrip, type Cloth } from "./cloth";

// A thin strip of African cloth along an edge, sliding slowly sideways.
// Ported from SongFromWithin's Africa page. Decorative only.
export function ClothBand({ cloth, height, reverse = false, className = "" }: { cloth: Cloth; height: number; reverse?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // drawn at twice the size so it stays sharp on high-density screens
    el.style.backgroundImage = `url(${clothStrip(cloth, height * 2).toDataURL()})`;
    el.style.backgroundSize = `${CLOTH_LENGTH / 2}px ${height}px`;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animation = el.animate(
      [{ backgroundPositionX: "0px" }, { backgroundPositionX: `${reverse ? CLOTH_LENGTH / 2 : -CLOTH_LENGTH / 2}px` }],
      { duration: 20000, iterations: Infinity, easing: "linear" },
    );
    return () => animation.cancel();
  }, [cloth, height, reverse]);

  return <div ref={ref} aria-hidden="true" style={{ height }} className={`bg-repeat-x ${className}`} />;
}
