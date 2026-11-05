"use client";

import type { ReactNode } from "react";
import { OPEN_CARD_EVENT } from "./CardModal";

// A real link to the card page; with JavaScript it opens the modal instead.
export function CardTrigger({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className={className}
      aria-haspopup="dialog"
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        window.dispatchEvent(new Event(OPEN_CARD_EVENT));
      }}
    >
      {children}
    </a>
  );
}
