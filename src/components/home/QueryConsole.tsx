"use client";

import { useId, useState } from "react";
import { Terminal } from "lucide-react";
import type { Capability } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionary";
import { Icon } from "@/components/icons";

const PICKS = ["kql", "sentinel", "nessus", "panorama", "zero trust", "claude code"];

function matches(c: Capability, term: string) {
  const q = term.trim().toLowerCase();
  if (!q) return true;
  return [c.name, c.approach, c.tools, c.outcome, c.keywords].join(" ").toLowerCase().includes(q);
}

// A real KQL-shaped query over the skills on this page. Without JavaScript every row shows.
export function QueryConsole({ rows, t }: { rows: Capability[]; t: Dictionary["query"] }) {
  const [term, setTerm] = useState("");
  const inputId = useId();
  const visible = rows.filter((r) => matches(r, term));
  const count = (visible.length === 1 ? t.rowsOne : t.rowsMany).replace("{n}", String(visible.length));

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-lift">
      <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-navy-900 p-6 sm:p-8">
          <p className="flex items-center gap-2.5 font-semibold text-[#f8f4ea]">
            <Terminal size={20} className="text-gold-400" aria-hidden /> {t.title}
          </p>
          <pre className="kql mt-5">
            <code>
              <span>HaigSkills</span>
              {"\n"}
              <span className="kw">| where</span> * <span className="kw">has</span> <span className="str">&quot;</span>
              <label htmlFor={inputId} className="sr-only">{t.label}</label>
              <input
                id={inputId}
                type="search"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                spellCheck={false}
                autoComplete="off"
                size={Math.max(6, term.length + 1)}
                placeholder="azure"
              />
              <span className="str">&quot;</span>
              {"\n"}
              <span className="kw">| project</span> Capability, Tools, Impact
            </code>
          </pre>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-sm text-[#9fb0cc]">{t.suggestions}</span>
            {PICKS.map((p) => (
              <button
                key={p}
                type="button"
                className="pick !border-white/15 !bg-white/5 !text-[#f5f1e6] aria-pressed:!border-gold-500 aria-pressed:!bg-gold-500 aria-pressed:!text-navy-950"
                aria-pressed={term.toLowerCase() === p}
                onClick={() => setTerm(term.toLowerCase() === p ? "" : p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="m-0 flex items-center justify-between text-sm font-semibold text-muted" role="status" aria-live="polite">
            <span>{visible.length ? count : t.none}</span>
            {term && (
              <button type="button" className="text-link cursor-pointer border-0 bg-transparent text-sm" onClick={() => setTerm("")}>
                {t.reset}
              </button>
            )}
          </p>
          <ul className="mt-4 grid max-h-[380px] list-none gap-2.5 overflow-auto p-0 pr-1">
            {rows.map((r) => (
              <li key={r.id} hidden={!visible.includes(r)} className="rounded-2xl border border-line bg-bg p-4">
                <p className="m-0 flex items-center gap-2.5 font-semibold text-ink">
                  <Icon name={r.icon} size={30} />
                  {r.name}
                </p>
                <p className="m-0 mt-1 text-sm text-muted">{r.tools}</p>
                <p className="m-0 mt-2 text-sm font-medium text-gold-ink">→ {r.outcome}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
