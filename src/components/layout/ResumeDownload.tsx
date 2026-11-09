"use client";

import { useEffect, useId, useRef } from "react";
import { ChevronDown, Download, FilePenLine, FileText } from "lucide-react";
import type { ResumeFiles } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionary";

type Props = {
  files: ResumeFiles;
  t: Dictionary;
  // Button text; defaults to "Download resume"
  label?: string;
  className: string;
  wrapperClassName?: string;
  iconSize?: number;
};

const MENU_WIDTH = 288;
const GUTTER = 16;

// "Download resume" button that lets the visitor pick PDF (ready to send) or Word (editable).
// The menu uses the native popover API: it sits in the top layer, so sections with
// overflow: hidden cannot clip it, and the browser handles Escape and click-outside.
export function ResumeDownload({ files, t, label, className, wrapperClassName = "", iconSize = 18 }: Props) {
  const id = useId();
  const btn = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const f = t.resume.formats;

  useEffect(() => {
    const m = menu.current;
    const b = btn.current;
    if (!m || !b) return;

    const place = () => {
      const r = b.getBoundingClientRect();
      const width = Math.min(MENU_WIDTH, window.innerWidth - GUTTER * 2);
      const left = Math.min(Math.max(GUTTER, r.left), window.innerWidth - width - GUTTER);
      const height = m.offsetHeight || 150;
      const below = r.bottom + 8 + height <= window.innerHeight;
      m.style.width = `${width}px`;
      m.style.left = `${left}px`;
      m.style.top = `${below ? r.bottom + 8 : Math.max(GUTTER, r.top - 8 - height)}px`;
    };
    const close = () => m.matches(":popover-open") && m.hidePopover();
    // Placed before it shows (no flash at the default centred spot), then again with its real height.
    const onBefore = (e: Event) => (e as ToggleEvent).newState === "open" && place();
    const onToggle = (e: Event) => {
      const open = (e as ToggleEvent).newState === "open";
      b.setAttribute("aria-expanded", String(open));
      if (open) {
        place();
        window.addEventListener("scroll", close, { passive: true });
        window.addEventListener("resize", close);
      } else {
        window.removeEventListener("scroll", close);
        window.removeEventListener("resize", close);
      }
    };
    m.addEventListener("beforetoggle", onBefore);
    m.addEventListener("toggle", onToggle);
    return () => {
      m.removeEventListener("beforetoggle", onBefore);
      m.removeEventListener("toggle", onToggle);
      window.removeEventListener("scroll", close);
      window.removeEventListener("resize", close);
    };
  }, []);

  const options = [
    { href: files.pdf, Icon: FileText, name: f.pdf, hint: f.pdfHint },
    { href: files.docx, Icon: FilePenLine, name: f.word, hint: f.wordHint },
  ];

  return (
    <div className={wrapperClassName}>
      <button
        ref={btn}
        type="button"
        className={className}
        popoverTarget={id}
        aria-haspopup="menu"
        aria-expanded="false"
      >
        <Download size={iconSize} aria-hidden /> {label ?? t.hero.primary}
        <ChevronDown size={iconSize - 2} aria-hidden className="-mr-1 opacity-80" />
      </button>
      <div ref={menu} id={id} popover="auto" role="menu" aria-label={f.choose} className="resume-menu">
        <p className="resume-menu-title">{f.choose}</p>
        {options.map(({ href, Icon, name, hint }) => (
          <a
            key={href}
            href={href}
            download
            role="menuitem"
            className="resume-menu-item"
            onClick={() => menu.current?.hidePopover()}
          >
            <span className="resume-menu-icon">
              <Icon size={20} aria-hidden />
            </span>
            <span>
              <span className="block font-semibold text-ink">{name}</span>
              <span className="block text-sm text-muted">{hint}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
