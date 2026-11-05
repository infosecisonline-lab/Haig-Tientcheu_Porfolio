"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";
import { LangSwitch } from "./LangSwitch";
import { ThemeToggle } from "./ThemeToggle";
import { ClothBand } from "@/components/african/ClothBand";

type Props = { lang: Locale; t: Dictionary; resumeHref: string; solid?: boolean };

export function SiteHeader({ lang, t, resumeHref, solid = false }: Props) {
  const [scrolled, setScrolled] = useState(solid);
  const [open, setOpen] = useState(false);
  const home = `/${lang}`;

  useEffect(() => {
    if (solid) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const items = [
    { id: "about", label: t.nav.about },
    { id: "expertise", label: t.nav.expertise },
    { id: "experience", label: t.nav.experience },
    { id: "credentials", label: t.nav.credentials },
    { id: "projects", label: t.nav.projects },
    { id: "impact", label: t.nav.impact },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <header className={`site-header ${solid ? "bg-navy-900" : ""}`} data-scrolled={scrolled || open}>
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Link href={home} className="flex items-center gap-3 text-[#f8f4ea] no-underline" aria-label="Haig Tientcheu">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-500 font-display text-lg font-bold text-navy-950">
            HT
          </span>
          <span className="hidden font-display text-lg font-semibold tracking-tight sm:inline">Haig Tientcheu</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {items.map((i) => (
            <a key={i.id} href={`${home}#${i.id}`} className="nav-link">
              {i.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 text-[#f5f1e6]">
          <span className="grid h-10 min-w-10 place-items-center rounded-full px-2 text-sm font-semibold hover:text-gold-300 [&_a]:no-underline">
            <LangSwitch lang={lang} label={t.lang.label} text={lang === "en" ? "FR" : "EN"} />
          </span>
          <span className="grid h-10 w-10 place-items-center rounded-full hover:text-gold-300 [&_button]:cursor-pointer">
            <ThemeToggle labels={t.theme} />
          </span>
          <a href={resumeHref} download className="btn btn-gold ml-1 hidden !min-h-[42px] !px-4 text-sm md:inline-flex">
            <Download size={17} aria-hidden /> {t.nav.resume}
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full text-[#f5f1e6] hover:bg-white/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          </button>
        </div>
      </div>

      <ClothBand cloth="kente" height={6} />

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-white/10 bg-navy-900 lg:hidden">
          <ul className="container-x grid gap-1 py-4">
            {items.map((i) => (
              <li key={i.id}>
                <a
                  href={`${home}#${i.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-lg font-medium text-[#f5f1e6] no-underline hover:bg-white/5 hover:text-gold-300"
                >
                  {i.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a href={resumeHref} download className="btn btn-gold w-full">
                <Download size={18} aria-hidden /> {t.hero.primary}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
