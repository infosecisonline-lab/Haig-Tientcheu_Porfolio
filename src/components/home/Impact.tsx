import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/icons";
import { RibbonsBand } from "@/components/african/RibbonsBand";
import type { Profile } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionary";

export function Impact({ p, t }: { p: Profile; t: Dictionary }) {
  const l = p.leadership;
  const rows = l.lists.flatMap((g) => g.rows);
  const visit = t.work.visit;

  return (
    <section id="impact" aria-labelledby="impact-title" className="on-navy navy-glow navy-grid overflow-hidden pt-[clamp(4.5rem,9vw,7.5rem)]">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <p className="kicker">{t.sections.impact.kicker}</p>
            <h2 id="impact-title" className="h-section">{t.sections.impact.title}</h2>
            {/* The Way of Hope's own logo, on a light plate so its navy and gold read on the dark band */}
            <a
              href={rows[0]?.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center rounded-2xl bg-[#faf7f0] px-4 py-2.5 shadow-lg ring-1 ring-gold-500/40 transition hover:-translate-y-0.5"
              aria-label={`The Way of Hope, ${visit}`}
            >
              <Image src="/orgs/wayofhope.png" alt="The Way of Hope" width={210} height={96} unoptimized className="h-12 w-auto" />
            </a>
            <p className="mt-6 text-[1.125rem] leading-relaxed text-[#d0d7e4]">{l.paragraph}</p>
            <dl className="mt-8 grid gap-3 sm:grid-cols-3">
              {l.facts.map((f) => (
                <div key={f.label} className="flex flex-col-reverse justify-end rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <dt className="text-xs text-[#9fb0cc]">{f.label}</dt>
                  <dd className="m-0 mb-1 font-semibold leading-snug text-gold-300">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="relative m-0" data-reveal style={{ ["--d" as string]: "120ms" }}>
            <div className="absolute -inset-3 rounded-[30px] border border-gold-500/40" aria-hidden />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
              <Image src={l.image.src} alt={l.image.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
            </div>
            <figcaption className="absolute -bottom-5 right-5 inline-flex items-center gap-2 rounded-2xl bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-950 shadow-xl">
              <Image src="/orgs/wayofhope-emblem.png" alt="" width={28} height={32} unoptimized className="h-7 w-auto" />
              The Way of Hope · 2017
            </figcaption>
          </figure>
        </div>

        <ul className="mt-16 grid list-none gap-5 p-0 md:grid-cols-3">
          {rows.map((r, i) => {
            const body = (
              <>
                <span className="grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-[#faf7f0] shadow-md ring-1 ring-gold-500/40">
                  {r.logo ? (
                    <Image src={r.logo} alt={`${r.name} logo`} width={56} height={56} unoptimized className="h-12 w-12 object-contain" />
                  ) : (
                    <Icon name="book" size={40} />
                  )}
                </span>
                <span className="mt-5 block font-display text-xl font-semibold text-[#f8f4ea]">{r.name}</span>
                {r.detail && <span className="mt-1 block text-sm text-[#9fb0cc]">{r.detail}</span>}
                <span className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="inline-block rounded-full bg-white/[0.06] px-3 py-1 text-sm font-medium text-gold-300">{r.value}</span>
                  {r.href && (
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#f5f1e6] underline decoration-gold-500/60 underline-offset-4">
                      {r.href.replace(/^https:\/\/(www\.)?/, "")} <ArrowUpRight size={16} className="text-gold-400" aria-hidden />
                    </span>
                  )}
                </span>
              </>
            );
            return (
              <li key={r.name} data-reveal style={{ ["--d" as string]: `${i * 90}ms` }}>
                {r.href ? (
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className="block h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 no-underline transition hover:-translate-y-1 hover:border-gold-500/60">
                    {body}
                  </a>
                ) : (
                  <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Waving ribbons of African cloth, from SongFromWithin's Africa page */}
      <RibbonsBand preset="impact" className="mt-10 h-[150px] sm:h-[190px]" />
    </section>
  );
}
