import Image from "next/image";
import { ArrowUpRight, CalendarDays, Check, GitCommitHorizontal, LockKeyhole } from "lucide-react";
import type { Profile } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionary";
import { Icon, ToolChip } from "@/components/icons";
import { SectionHead } from "./SectionHead";
import { WorkVideo } from "@/components/sections/WorkVideo";

export function Projects({ p, t }: { p: Profile; t: Dictionary }) {
  const s = t.sections.projects;
  return (
    <section id="projects" aria-labelledby="projects-title" className="section bg-surface-2/60 dark:bg-navy-950/40">
      <div className="container-x">
        <SectionHead id="projects-title" kicker={s.kicker} title={s.title} intro={s.intro} />

        {/* How I build: the vibe-coding workflow */}
        <div className="mt-12 overflow-hidden rounded-3xl bg-navy-900 shadow-lift" data-reveal>
          <div className="grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {p.vibe.map((v) => (
              <div key={v.name} className="bg-navy-900 p-6">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-lg">
                  <Icon name={v.icon} size={34} />
                </span>
                <h3 className="mt-4 mb-0 text-lg font-semibold text-[#f8f4ea]">{v.name}</h3>
                <p className="m-0 mt-2 text-[0.95rem] leading-relaxed text-[#b9c4d8]">{v.use}</p>
              </div>
            ))}
          </div>
          <dl className="m-0 grid grid-cols-3 border-t border-white/10">
            {p.vibeStats.map((st) => (
              <div key={st.label} className="flex flex-col-reverse items-center px-3 py-5 text-center">
                <dt className="text-xs text-[#9fb0cc] sm:text-sm">{st.label}</dt>
                <dd className="m-0 font-display text-3xl font-semibold text-gold-400">{st.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-20 grid gap-20 lg:gap-24">
          {p.ventures.map((v, i) => {
            const flip = i % 2 === 1;
            const host = v.url.replace(/^https:\/\/(www\.)?/, "");
            return (
              <article key={v.id} aria-labelledby={`${v.id}-title`} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={`relative pb-10 ${flip ? "lg:order-2" : ""}`} data-reveal>
                  <div className="browser">
                    <div className="browser-bar" aria-hidden>
                      <i /> <i /> <i />
                      <span className="browser-url">{host}</span>
                    </div>
                    <div className="browser-view">
                      {v.image.video ? (
                        <WorkVideo src={v.image.video} poster={v.image.main} label={v.image.alt} />
                      ) : (
                        <Image src={v.image.main} alt={v.image.alt} fill sizes="(min-width: 1024px) 560px, 100vw" />
                      )}
                    </div>
                  </div>
                  {v.image.mobile && (
                    <div className={`absolute bottom-0 hidden w-[24%] overflow-hidden rounded-[22px] border-[5px] border-navy-950 bg-navy-950 shadow-lift sm:block ${flip ? "-left-4" : "-right-4"}`}>
                      <div className="relative aspect-[9/19]">
                        <Image src={v.image.mobile} alt="" fill sizes="140px" className="object-cover object-top" />
                      </div>
                    </div>
                  )}
                </div>

                <div className={flip ? "lg:order-1" : ""} data-reveal style={{ ["--d" as string]: "120ms" }}>
                  <p className="m-0 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-3 py-1 text-sm font-semibold text-gold-ink">
                      <Icon name="claude" size={16} /> {v.role}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-sm font-semibold text-ink ring-1 ring-line">
                      <CalendarDays size={15} aria-hidden /> {v.period}
                    </span>
                    {v.commits && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-sm font-semibold text-ink ring-1 ring-line">
                        <GitCommitHorizontal size={15} aria-hidden /> {v.commits}
                      </span>
                    )}
                  </p>
                  <h3 id={`${v.id}-title`} className="mt-4 font-display text-[clamp(2rem,1.5rem+1.8vw,2.75rem)] font-semibold tracking-tight">
                    {v.name}
                  </h3>
                  <p className="mt-3 text-[1.0625rem]">{v.summary}</p>

                  <ul className="mt-6 grid list-none gap-2.5 p-0">
                    {v.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3">
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy-900 text-gold-400 dark:bg-gold-500 dark:text-navy-950">
                          <Check size={14} strokeWidth={3} aria-hidden />
                        </span>
                        <span className="text-ink">{h}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 flex items-start gap-3 rounded-2xl border border-line bg-surface p-4 text-[0.95rem]">
                    <LockKeyhole size={20} className="mt-0.5 shrink-0 text-gold-ink" aria-hidden />
                    <span>
                      <strong className="text-ink">{t.work.security}.</strong> {v.security}
                    </span>
                  </p>

                  <p className="mt-5 flex flex-wrap gap-1.5">
                    {v.stack.split(", ").map((x) => (
                      <ToolChip key={x} name={x} />
                    ))}
                  </p>

                  {v.id !== "portfolio" && (
                    <a href={v.url} target="_blank" rel="noopener noreferrer" className="btn btn-navy mt-7">
                      {t.work.visit} <ArrowUpRight size={18} aria-hidden />
                    </a>
                  )}
                </div>

              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
