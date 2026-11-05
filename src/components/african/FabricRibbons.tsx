"use client";

import { useEffect, useRef } from "react";
import { CLOTH_LENGTH, clothStrip, type Cloth } from "./cloth";

export interface Ribbon {
  cloth: Cloth;
  // Vertical position of the ribbon's centre line, 0 (top) to 1 (bottom).
  y: number;
  amp: number;
  freq: number;
  speed: number;
  phase: number;
  // How fast the pattern slides along the ribbon (negative: the other way).
  flow: number;
  // False: not drawn on phones.
  mobile?: boolean;
}

// Waving ribbons of African cloth behind a section, ported from SongFromWithin's Africa page.
// Decorative: hidden from screen readers, paused off screen, still under prefers-reduced-motion.
export function FabricRibbons({ ribbons, className = "" }: { ribbons: Ribbon[]; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const g = canvas?.getContext("2d");
    if (!canvas || !g) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let thick = 15;
    let active: Ribbon[] = [];
    let textures: HTMLCanvasElement[] = [];
    let t = 0;
    let visible = true;
    let frame = 0;

    const build = () => {
      width = canvas.width = canvas.offsetWidth * dpr;
      height = canvas.height = canvas.offsetHeight * dpr;
      const phone = window.innerWidth < 700;
      thick = (phone ? 12 : 16) * dpr;
      active = phone ? ribbons.filter((r) => r.mobile !== false) : ribbons;
      textures = active.map((r) => clothStrip(r.cloth, thick));
    };
    build();
    window.addEventListener("resize", build);
    const observer = new IntersectionObserver(([entry]) => (visible = entry?.isIntersecting ?? true));
    observer.observe(canvas);

    const yAt = (r: Ribbon, x: number) => {
      const p = x / width;
      const amp = height * r.amp;
      return (
        height * r.y +
        Math.sin(p * r.freq * Math.PI * 2 + t * r.speed + r.phase) * amp * (0.6 + 0.4 * Math.sin(p * Math.PI)) +
        Math.sin(p * r.freq * 2.2 * Math.PI + t * r.speed * 1.6) * amp * 0.22
      );
    };

    const drawRibbon = (r: Ribbon, tex: HTMLCanvasElement) => {
      const step = 8 * dpr;
      let prevX = -step;
      let prevY = yAt(r, prevX);
      let along = (((t * r.flow * 60) % CLOTH_LENGTH) + CLOTH_LENGTH) % CLOTH_LENGTH;
      const top: [number, number][] = [];
      const bottom: [number, number][] = [];
      for (let x = 0; x <= width + step; x += step) {
        const y = yAt(r, x);
        const dx = x - prevX;
        const dy = y - prevY;
        const len = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        let source = along % CLOTH_LENGTH;
        let need = len + 1;
        let drawn = 0;
        while (need > 0) {
          const take = Math.min(need, CLOTH_LENGTH - source);
          g.setTransform(cos, sin, -sin, cos, prevX, prevY);
          g.drawImage(tex, source, 0, take, tex.height, drawn, -thick / 2, take, thick);
          drawn += take;
          need -= take;
          source = 0;
        }
        top.push([prevX - sin * (thick / 2), prevY + cos * (thick / 2)]);
        bottom.push([prevX + sin * (thick / 2), prevY - cos * (thick / 2)]);
        along += len;
        prevX = x;
        prevY = y;
      }
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.strokeStyle = "rgba(20,15,10,.35)";
      g.lineWidth = 0.8 * dpr;
      for (const edge of [top, bottom]) {
        g.beginPath();
        edge.forEach(([px, py], i) => (i ? g.lineTo(px, py) : g.moveTo(px, py)));
        g.stroke();
      }
    };

    const draw = () => {
      if (visible) {
        t += 0.005;
        g.setTransform(1, 0, 0, 1, 0, 0);
        g.clearRect(0, 0, width, height);
        active.forEach((r, i) => {
          const tex = textures[i];
          if (tex) drawRibbon(r, tex);
        });
      }
      if (!reduce) frame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", build);
      observer.disconnect();
    };
  }, [ribbons]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
