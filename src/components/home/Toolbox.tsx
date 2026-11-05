import type { Profile } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionary";
import { Icon, ToolChip } from "@/components/icons";
import { SectionHead } from "./SectionHead";

export function Toolbox({ p, t }: { p: Profile; t: Dictionary }) {
  return (
    <section id="toolbox" aria-labelledby="toolbox-title" className="on-navy navy-glow navy-grid section overflow-hidden">
      <div className="container-x">
        <SectionHead id="toolbox-title" center {...t.sections.toolbox} />
        <ul className="mt-12 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {p.toolbox.map((g, i) => (
            <li
              key={g.label}
              className={`rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-gold-500/50 ${i === 4 ? "lg:col-span-2" : ""}`}
              data-reveal
              style={{ ["--d" as string]: `${(i % 4) * 80}ms` }}
            >
              <div className="flex items-center gap-3">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-white to-[#f1e9d6] shadow-md ring-1 ring-gold-500/40">
                  <Icon name={g.icon} size={38} />
                </span>
                <h3 className="m-0 text-lg font-semibold">{g.label}</h3>
              </div>
              <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
                {g.items.map((it) => (
                  <li key={it}>
                    <ToolChip name={it} dark />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
