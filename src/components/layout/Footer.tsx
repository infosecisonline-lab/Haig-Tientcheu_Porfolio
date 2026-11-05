import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";
import { contact, links } from "@/config/site";
import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";
import { LinkedInIcon } from "./LinkedInIcon";
import { ClothBand } from "@/components/african/ClothBand";

export function Footer({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const home = `/${lang}`;
  const year = new Date().getFullYear();
  const col = "m-0 mb-4 text-sm font-semibold uppercase tracking-[0.1em] text-gold-400";
  const a = "text-[#c9d1e0] no-underline transition-colors hover:text-gold-300";

  return (
    <footer className="on-navy bg-navy-950">
      <ClothBand cloth="toghu" height={14} reverse />
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href={home} className="inline-flex items-center gap-3 text-[#f8f4ea] no-underline">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-500 font-display text-lg font-bold text-navy-950">HT</span>
            <span className="font-display text-xl font-semibold">Haig Tientcheu</span>
          </Link>
          <p className="mt-5 max-w-xs text-[#9fb0cc]">{t.footer.tagline}</p>
          <div className="mt-6 flex gap-3">
            <a href={`mailto:${contact.email}`} aria-label="Email" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-[#f5f1e6] transition hover:border-gold-500 hover:text-gold-300">
              <Mail size={19} aria-hidden />
            </a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-[#f5f1e6] transition hover:border-gold-500 hover:text-gold-300">
              <LinkedInIcon size={18} />
            </a>
          </div>
        </div>

        <nav aria-label={t.footer.pages}>
          <h2 className={col}>{t.footer.pages}</h2>
          <ul className="m-0 grid list-none gap-2.5 p-0">
            <li><a className={a} href={`${home}#about`}>{t.nav.about}</a></li>
            <li><a className={a} href={`${home}#expertise`}>{t.nav.expertise}</a></li>
            <li><a className={a} href={`${home}#experience`}>{t.nav.experience}</a></li>
            <li><a className={a} href={`${home}#toolbox`}>{t.nav.toolbox}</a></li>
            <li><a className={a} href={`${home}#credentials`}>{t.nav.credentials}</a></li>
            <li><a className={a} href={`${home}#projects`}>{t.nav.projects}</a></li>
          </ul>
        </nav>

        <div>
          <h2 className={col}>{t.footer.products}</h2>
          <ul className="m-0 grid list-none gap-2.5 p-0">
            <li><a className={a} href={links.songfromwithin} target="_blank" rel="noopener noreferrer">SongFromWithin</a></li>
            <li><a className={a} href={links.stoknextra} target="_blank" rel="noopener noreferrer">StokNextra</a></li>
            <li><a className={a} href={links.wayofhope} target="_blank" rel="noopener noreferrer">The Way of Hope</a></li>
            <li><a className={a} href={links.shieldcharities} target="_blank" rel="noopener noreferrer">Shield of Faith Charities</a></li>
          </ul>
        </div>

        <div>
          <h2 className={col}>{t.footer.reach}</h2>
          <ul className="m-0 grid list-none gap-2.5 p-0">
            <li><a className={a} href={`${home}#contact`}>{t.nav.contact}</a></li>
            <li><Link className={a} href={`${home}/resume`}>{t.nav.resume}</Link></li>
            <li><Link className={a} href={`${home}/card`}>{t.card.open}</Link></li>
            <li><a className={a} href="/.well-known/security.txt">{t.footer.security}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 py-6 pb-24 text-sm text-[#9fb0cc] sm:pb-6">
          <p className="m-0">© {year} Haig Tientcheu. {t.footer.rights}</p>
          <a href="#top" className="inline-flex items-center gap-2 text-[#c9d1e0] no-underline hover:text-gold-300">
            {t.footer.top} <ArrowUp size={16} aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
