import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SITE_URL, contact, resumeFiles } from "@/config/site";
import { getProfile } from "@/content/profile";
import { getDictionary } from "@/i18n/dictionary";
import { hasLocale } from "@/i18n/locales";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LangSwitch } from "@/components/layout/LangSwitch";
import { ResumeDownload } from "@/components/layout/ResumeDownload";

export async function generateMetadata({ params }: PageProps<"/[lang]/resume">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    title: getDictionary(lang).resume.title,
    alternates: { canonical: `/${lang}/resume`, languages: { en: "/en/resume", fr: "/fr/resume" } },
  };
}

// US-format resume: one column, no photo, real text so ATS parsers can read it.
// Content mirrors Haig's own resume (August 2026). The book stays on the portfolio only.
export default async function ResumePage({ params }: PageProps<"/[lang]/resume">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const p = getProfile(lang);
  const t = getDictionary(lang);
  const r = p.resume;
  const site = SITE_URL.replace(/^https:\/\//, "");
  const extra = p.facts.slice(1).map((f) => f.label).join(" · ");
  const L = lang === "fr"
    ? { projects: "Projets (développement web & vibe coding)", edu: "Formation" }
    : { projects: "Projects (Web Development & Vibe Coding)", edu: "Education" };

  return (
    <>
      <div className="resume-bar no-print">
        <Link href={`/${lang}`} className="text-link inline-flex items-center gap-2">
          <ArrowLeft size={18} aria-hidden /> {t.resume.back}
        </Link>
        <div className="flex items-center gap-4 text-ink">
          <LangSwitch lang={lang} label={t.lang.label} text={lang === "en" ? "FR" : "EN"} />
          <ThemeToggle labels={t.theme} />
          <ResumeDownload files={resumeFiles[lang]} t={t} className="btn btn-gold" />
        </div>
      </div>

      <main id="main" className="resume">
        <header>
          <h1>{p.name.toUpperCase()}</h1>
          <p className="r-title">{p.title}</p>
          <p className="r-contact">
            {contact.location} · {contact.phone ? `${contact.phone} · ` : ""}<a href={`mailto:${contact.email}`}>{contact.email}</a> ·{" "}
            <a href={contact.linkedin}>linkedin.com/in/haig-tientcheu</a> · <a href={SITE_URL}>{site}</a>
          </p>
          <p className="r-contact">{extra}</p>
        </header>

        <section aria-labelledby="r-summary">
          <h2 id="r-summary">{t.resume.summary}</h2>
          <p>{r.summary}</p>
        </section>

        <section aria-labelledby="r-exp">
          <h2 id="r-exp">{t.resume.experience}</h2>
          {p.jobs.filter((j) => !j.siteOnly).map((j) => (
            <div key={j.title} className="r-job">
              <div className="r-job-head">
                <strong>{j.title}</strong>
                <span>{j.dates}</span>
              </div>
              <div className="r-job-head">
                <span>
                  {j.company}
                  {j.client ? ` — ${j.client.replace(/^Client ?: /, "Client: ")}` : ""}
                </span>
                <span>{j.location}</span>
              </div>
              <ul>
                {j.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section aria-labelledby="r-projects">
          <h2 id="r-projects">{L.projects}</h2>
          <ul>
            {r.projects.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="r-edu">
          <h2 id="r-edu">{L.edu}</h2>
          <ul>
            {p.education.map((e) => (
              <li key={e.degree}>
                <strong>{e.degree}</strong>, {e.school}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="r-certs">
          <h2 id="r-certs">{t.resume.certifications}</h2>
          <ul className="r-cols">
            {p.certifications.map((c) => (
              <li key={c.name}>{c.name}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="r-skills">
          <h2 id="r-skills">{t.resume.skills}</h2>
          <div className="r-skills">
            {r.skills.map((s) => (
              <p key={s.label}>
                <strong>{s.label}:</strong> {s.items}
              </p>
            ))}
          </div>
        </section>

        <section aria-labelledby="r-lead">
          <h2 id="r-lead">{t.resume.leadership}</h2>
          <ul>
            {r.leadership.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
