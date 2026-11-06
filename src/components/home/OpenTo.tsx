import { ArrowRight, Laptop } from "lucide-react";
import type { Profile } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionary";
import { Icon } from "@/components/icons";

// What a recruiter checks first: the roles Haig wants, how and where.
export function OpenTo({ p, t }: { p: Profile; t: Dictionary }) {
  const o = p.openTo;
  return (
    <section aria-labelledby="open-to-title" className="relative pt-12 sm:pt-16">
      <div className="container-x">
        <div className="card relative overflow-hidden p-6 sm:p-8" data-reveal>
          <span className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-gold-400 via-gold-500 to-gold-600" aria-hidden />
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.6fr] lg:items-center">
            <div>
              <p className="m-0 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/30">
                <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                {p.badge}
              </p>
              <h2 id="open-to-title" className="mt-4 mb-0 font-display text-[clamp(1.6rem,1.2rem+1.4vw,2.25rem)] font-semibold leading-tight">
                {o.title}
              </h2>
              <p className="m-0 mt-4 flex items-center gap-2 font-semibold text-ink">
                <Laptop size={20} className="text-gold-ink" aria-hidden /> {o.mode}
              </p>
              <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
                {o.locations.map((loc) => (
                  <li key={loc} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3 py-1 text-sm font-medium text-ink">
                    <Icon name="location" size={16} /> {loc}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="text-link mt-5 inline-flex items-center gap-1.5">
                {t.hero.contact} <ArrowRight size={16} aria-hidden />
              </a>
            </div>

            <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {o.roles.map((r) => (
                <li
                  key={r.label}
                  className="flex items-center gap-3 rounded-2xl border border-emerald-300 bg-emerald-50 p-3.5 transition hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-[0_10px_24px_-14px_rgba(16,185,129,0.7)] dark:border-emerald-400/40 dark:bg-emerald-400/10"
                >
                  <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-300 shadow-sm ring-2 ring-emerald-500/70">
                    <Icon name={r.icon} size={32} />
                    <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-navy-900" aria-hidden />
                  </span>
                  <span className="font-semibold leading-snug text-ink">{r.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
