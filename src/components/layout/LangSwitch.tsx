"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "@/i18n/locales";

export function LangSwitch({ lang, label, text }: { lang: Locale; label: string; text: string }) {
  const pathname = usePathname() ?? `/${lang}`;
  const other: Locale = lang === "en" ? "fr" : "en";
  const href = pathname.replace(/^\/(en|fr)(?=\/|$)/, `/${other}`);

  return (
    <Link
      href={href}
      hrefLang={other}
      lang={other}
      aria-label={label}
      onClick={() => {
        // Remember the choice for one year; read by src/proxy.ts on the next visit.
        document.cookie = `${LOCALE_COOKIE}=${other}; path=/; max-age=31536000; samesite=lax; secure`;
      }}
    >
      {text}
    </Link>
  );
}
