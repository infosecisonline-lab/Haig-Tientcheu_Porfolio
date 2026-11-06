import { ArrowRight, Contact, Download, ShieldCheck } from "lucide-react";
import type { Profile } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionary";
import { CardTrigger } from "@/components/card/CardTrigger";
import { Icon } from "@/components/icons";
import { ClothBand } from "@/components/african/ClothBand";

type Props = { p: Profile; t: Dictionary; resumeHref: string; cardHref: string };

export function Hero({ p, t, resumeHref, cardHref }: Props) {
  const top = p.certifications.slice(0, 4);
  const more = p.certifications.length - top.length;
  return (
    <section id="top" aria-labelledby="hero-title" className="on-navy navy-glow navy-grid overflow-hidden pt-[72px]">
      <div className="container-x grid items-center gap-14 pb-16 pt-12 md:pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:pb-20">
        <div className="hero-in">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-[#e6eaf2]">
            <span className="beacon" aria-hidden />
            {p.badge}
          </p>

          <h1 id="hero-title" className="mt-6 font-display text-[clamp(2.9rem,1.6rem+5.6vw,5.5rem)] font-semibold leading-[1.02] tracking-tight">
            {p.name}
          </h1>

          {/* One icon per role, so the specialty reads at a glance */}
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={p.shortTitle}>
            {p.roles.map((r) => (
              <li key={r.label} className="neon inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold">
                <Icon name={r.icon} size={22} />
                {r.label}
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-xl text-[1.125rem] leading-relaxed text-[#c9d1e0]">{p.tagline}</p>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#9fb0cc]">
            {p.facts.map((f) => (
              <li key={f.label} className="inline-flex items-center gap-2">
                <Icon name={f.icon} size={20} />
                {f.label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={resumeHref} download className="btn btn-gold">
              <Download size={19} aria-hidden /> {t.hero.primary}
            </a>
            <a href="#experience" className="btn btn-ghost-light">
              {t.nav.experience} <ArrowRight size={18} aria-hidden />
            </a>
            <CardTrigger href={cardHref} className="btn btn-ghost-light">
              <Contact size={18} aria-hidden /> {t.hero.card}
            </CardTrigger>
          </div>
        </div>

        {/* Credentials panel: certifications + a real KQL hunting query */}
        <div className="hero-panel relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="float-slow rounded-3xl border border-white/10 bg-[#0d2347]/80 p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="m-0 text-sm font-semibold uppercase tracking-[0.12em] text-gold-400">{t.nav.credentials}</p>
              <ShieldCheck className="text-gold-400" size={22} aria-hidden />
            </div>
            <ul className="mt-5 grid gap-2.5">
              {top.map((c) => (
                <li key={c.name} className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-4 py-2.5">
                  <Icon name={c.icon} size={44} />
                  <span className="min-w-0">
                    <span className="block text-[0.95rem] font-semibold leading-snug text-[#f8f4ea]">{c.name.replace("Microsoft Certified: ", "")}</span>
                    <span className="block text-xs text-[#9fb0cc]">{c.issuer}</span>
                  </span>
                </li>
              ))}
            </ul>
            <a href="#credentials" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 no-underline hover:text-gold-400">
              +{more} {t.nav.credentials.toLowerCase()} <ArrowRight size={15} aria-hidden />
            </a>
            <pre className="kql mt-4 !text-[0.8rem] !leading-relaxed" aria-label="KQL threat hunting query">
              <code>
                <span>DeviceProcessEvents</span>
                {"\n"}
                <span className="kw">| where</span> FileName <span className="kw">=~</span> <span className="str">&quot;powershell.exe&quot;</span>
                {"\n"}
                <span className="kw">| where</span> ProcessCommandLine <span className="kw">has</span> <span className="str">&quot;-enc&quot;</span>
                {"\n"}
                <span className="kw">| summarize</span> count() <span className="kw">by</span> DeviceName
              </code>
            </pre>
          </div>
          <p className="absolute -bottom-5 -left-3 m-0 hidden items-center gap-2 rounded-2xl bg-gold-500 px-4 py-2.5 text-sm font-semibold text-navy-950 shadow-xl sm:inline-flex">
            <ShieldCheck size={18} aria-hidden /> {t.hero.zeroTrust}
          </p>
        </div>
      </div>

      {/* Key figures */}
      <div className="border-t border-white/10 bg-navy-950/40">
        <dl className="container-x grid grid-cols-2 gap-y-6 py-8 md:grid-cols-4">
          {p.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse px-2 md:border-l md:border-white/10 md:px-6 md:first:border-l-0 md:first:pl-0">
              <dt className="text-sm text-[#9fb0cc]">{s.label}</dt>
              <dd className="m-0 font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-semibold text-gold-400">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <ClothBand cloth="ndop" height={14} />
    </section>
  );
}
