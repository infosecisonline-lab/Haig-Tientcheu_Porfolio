import type { Profile } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionary";
import { Icon } from "@/components/icons";
import { SectionHead } from "./SectionHead";

export function Credentials({ p, t }: { p: Profile; t: Dictionary }) {
  return (
    <section id="credentials" aria-labelledby="credentials-title" className="section">
      <div className="container-x">
        <SectionHead id="credentials-title" center {...t.sections.credentials} />

        <ul className="mt-12 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {p.certifications.map((c, i) => (
            <li
              key={c.name}
              className="card card-hover group relative flex items-center gap-4 overflow-hidden p-5"
              data-reveal
              style={{ ["--d" as string]: `${(i % 3) * 80}ms` }}
            >
              <span className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-gold-400 to-gold-600" aria-hidden />
              <Icon name={c.icon} size={76} className="drop-shadow-md transition-transform duration-300 group-hover:scale-105" />
              <span className="min-w-0">
                <span className="block font-semibold leading-snug text-ink">{c.name}</span>
                <span className="mt-1 block text-sm font-medium text-gold-ink">
                  {t.credentials.issuer} {c.issuer}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <ul className="mt-8 grid list-none gap-4 p-0 md:grid-cols-3">
          {p.education.map((e, i) => (
            <li
              key={e.degree}
              className="flex items-start gap-4 rounded-[20px] bg-navy-900 p-6 text-[#d6dbe6] shadow-lift"
              data-reveal
              style={{ ["--d" as string]: `${i * 90}ms` }}
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-white to-[#f1e9d6] shadow-md ring-1 ring-gold-500/40">
                <Icon name="degree" size={38} />
              </span>
              <span>
                <span className="block font-display text-lg font-semibold leading-snug text-[#f8f4ea]">{e.degree}</span>
                <span className="mt-1 block text-sm text-gold-300">{e.school}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
