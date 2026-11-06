import { Building2, CalendarDays, Download, MapPin } from "lucide-react";
import type { Profile } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionary";
import { Icon } from "@/components/icons";
import { SectionHead } from "./SectionHead";

export function Experience({ p, t, resumeHref }: { p: Profile; t: Dictionary; resumeHref: string }) {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <div className="container-x grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead id="experience-title" {...t.sections.experience} />
          <ul className="mt-6 grid list-none gap-2 p-0" data-reveal>
            {p.roles.map((r) => (
              <li key={r.label} className="flex items-center gap-3 font-medium text-ink">
                <Icon name={r.icon} size={32} />
                {r.label}
              </li>
            ))}
          </ul>
          <a href={resumeHref} download className="btn btn-navy mt-8" data-reveal>
            <Download size={18} aria-hidden /> {t.hero.primary}
          </a>
        </div>

        <ol className="m-0 grid list-none gap-6 p-0">
          {p.jobs.map((j, i) => (
            <li key={j.title} className="relative" data-reveal style={{ ["--d" as string]: `${i * 90}ms` }}>
              <article className="card card-hover overflow-hidden">
                {/* Icon and dates on one row, then the title and details at full width:
                    nothing competes for space, so it reads the same on a phone and a desktop. */}
                <div className="border-b border-line bg-surface-2/50 p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-white to-[#f1e9d6] shadow-md ring-1 ring-gold-500/40 sm:h-16 sm:w-16">
                      <Icon name={j.icon} size={40} />
                    </span>
                    <p className="m-0 inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-navy-900 px-3 py-1 text-sm font-semibold text-gold-300 dark:bg-gold-500 dark:text-navy-950">
                      <CalendarDays size={15} aria-hidden /> {j.dates}
                    </p>
                  </div>
                  <h3 className="m-0 mt-4 text-[1.2rem] font-semibold leading-snug sm:text-xl">{j.title}</h3>
                  <p className="m-0 mt-2 flex items-start gap-2 text-[0.95rem] font-semibold text-gold-ink">
                    <Building2 size={16} className="mt-[3px] shrink-0" aria-hidden />
                    <span>{j.company}</span>
                  </p>
                  <p className="m-0 mt-1 flex items-start gap-2 text-[0.95rem] text-muted">
                    <MapPin size={16} className="mt-[3px] shrink-0" aria-hidden />
                    <span>{j.location}</span>
                  </p>
                  {j.client && <p className="m-0 mt-2 text-sm leading-relaxed text-muted">{j.client}</p>}
                </div>
                <ul className="m-0 grid list-none gap-2.5 p-5 sm:p-6">
                  {j.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[0.98rem]">
                      <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
