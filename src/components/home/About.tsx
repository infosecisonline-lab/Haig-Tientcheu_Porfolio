import { Contact, Download } from "lucide-react";
import type { Profile } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionary";
import { CardTrigger } from "@/components/card/CardTrigger";
import { Icon } from "@/components/icons";

export function About({ p, t, resumeHref, cardHref }: { p: Profile; t: Dictionary; resumeHref: string; cardHref: string }) {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div data-reveal>
          <p className="kicker">{t.sections.about.kicker}</p>
          <h2 id="about-title" className="h-section">{p.about.heading}</h2>
          <div className="mt-6 grid gap-4 text-[1.0625rem]">
            {p.about.paragraphs.map((para) => (
              <p key={para.slice(0, 24)} className="m-0">{para}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={resumeHref} download className="btn btn-navy">
              <Download size={18} aria-hidden /> {t.hero.primary}
            </a>
            <CardTrigger href={cardHref} className="btn btn-outline">
              <Contact size={18} aria-hidden /> {t.hero.card}
            </CardTrigger>
          </div>
        </div>

        <ul className="card m-0 grid list-none content-start gap-1 p-3 sm:p-4" data-reveal style={{ ["--d" as string]: "120ms" }}>
          {p.about.points.map((pt) => (
            <li key={pt.text} className="flex items-start gap-4 rounded-2xl p-4 transition-colors hover:bg-surface-2">
              <span className="icon-tile !h-14 !w-14">
                <Icon name={pt.icon} size={36} />
              </span>
              <span className="pt-3.5 font-medium text-ink">{pt.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
