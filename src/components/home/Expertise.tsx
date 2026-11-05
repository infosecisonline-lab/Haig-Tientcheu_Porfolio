import type { Profile } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionary";
import { Icon, ToolChip } from "@/components/icons";
import { SectionHead } from "./SectionHead";
import { QueryConsole } from "./QueryConsole";

export function Expertise({ p, t }: { p: Profile; t: Dictionary }) {
  const security = p.capabilities.filter((c) => c.id !== "vibe");
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="section bg-surface-2/60 dark:bg-navy-950/40">
      <div className="container-x">
        <SectionHead id="expertise-title" {...t.sections.expertise} />

        <ul className="mt-12 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {security.map((c, i) => (
            <li key={c.id} className="card card-hover group flex flex-col p-6" data-reveal style={{ ["--d" as string]: `${(i % 3) * 90}ms` }}>
              <div className="flex items-center gap-4">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-white to-[#f1e9d6] shadow-md ring-1 ring-gold-500/40 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon name={c.icon} size={42} />
                </span>
                <h3 className="m-0 text-xl font-semibold leading-snug">{c.name}</h3>
              </div>
              <p className="mt-4 text-[0.98rem] text-muted">{c.approach}</p>
              <p className="mt-4 flex flex-wrap gap-1.5">
                {c.tools.split(", ").map((tool) => (
                  <ToolChip key={tool} name={tool} />
                ))}
              </p>
              <p className="mt-auto border-t border-line pt-4 text-[0.95rem] font-medium text-ink">
                <span className="text-gold-ink">→ </span>
                {c.outcome}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-14" data-reveal>
          <QueryConsole rows={p.capabilities} t={t.query} />
        </div>
      </div>
    </section>
  );
}
