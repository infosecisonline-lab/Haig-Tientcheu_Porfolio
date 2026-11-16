// Builds the PRIVATE US federal resume (USAJOBS) from private/federal.json into private/, as PDF and Word (.docx).
// Nothing here is part of the website. Run: npm run federal
// OPM limits USAJOBS resumes to two pages (Merit Hiring Plan, effective 27 Sep 2025): the script warns if it runs over.
// Text written as [FILL IN: ...] is highlighted in yellow in both files and listed at the end of the run.
import { chromium } from "playwright-core";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import {
  AlignmentType, BorderStyle, Document, LevelFormat, Packer, Paragraph, TabStopType, TextRun,
} from "docx";

type Job = {
  title: string; employer: string; employerAddress: string; start: string; end: string;
  hoursPerWeek: number | string; seriesGrade?: string; salary?: string; supervisor?: string; duties: string[];
};
type Project = { title: string; organization: string; dates?: string; duties: string[] };
type Federal = {
  name: string; address: string; phone: string; email: string; citizenship: string; clearance: string;
  veteransPreference: string; federalStatus: string; availability: string; targetTitle: string; summary: string;
  experience: Job[]; projects?: Project[]; education: { degree: string; school: string; location: string; completed: string }[];
  certifications: { name: string; date: string }[]; skills: string[]; additional: string[];
};

const SRC = "private/federal.json";
const OUT = "private/Haig-Tientcheu-Federal-Resume";
const CHROME = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const FILL = /(\[FILL IN[^\]]*\])/;

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
// Escapes text and highlights [FILL IN: ...] markers
const h = (s: string) => s.split(FILL).map((part, i) => (i % 2 ? `<mark>${esc(part)}</mark>` : esc(part))).join("");

const jobMeta = (j: Job) =>
  [
    `${j.start} – ${j.end}`,
    typeof j.hoursPerWeek === "number" ? `${j.hoursPerWeek} hours per week` : `Hours: ${j.hoursPerWeek}`,
    j.seriesGrade && `Series/Grade: ${j.seriesGrade}`,
    j.salary && `Salary: ${j.salary}`,
  ].filter(Boolean).join(" · ");

const eduLine = (e: Federal["education"][number]) => `${e.degree}, ${e.school}, ${e.location}, completed ${e.completed}`;
const certLine = (c: Federal["certifications"][number]) => `${c.name} (${c.date})`;

function renderHtml(d: Federal) {
  const jobs = d.experience.map((j) => `<div class="job">
      <p><strong>${h(j.title)}</strong>, ${h(j.employer)}, ${h(j.employerAddress)}</p>
      <p class="meta">${h(jobMeta(j))}</p>
      ${j.supervisor ? `<p class="meta">Supervisor: ${h(j.supervisor)}</p>` : ""}
      <ul>${j.duties.map((x) => `<li>${h(x)}</li>`).join("")}</ul>
    </div>`).join("");
  const projects = (d.projects ?? []).map((p) => `<div class="job">
      <p><strong>${h(p.title)}</strong>${p.dates ? `, ${h(p.dates)}` : ""}</p>
      <p class="meta">${h(p.organization)}</p>
      <ul>${p.duties.map((x) => `<li>${h(x)}</li>`).join("")}</ul>
    </div>`).join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(d.name)} — Federal Resume</title><style>
    @page { size: Letter; margin: 0.5in 0.6in; }
    body { font: 10pt/1.32 Arial, Helvetica, sans-serif; color: #000; font-variant-ligatures: none; }
    h1 { font-size: 17pt; margin: 0; } h2 { font-size: 11pt; margin: 10pt 0 3pt; padding-bottom: 2pt; border-bottom: 1.5pt solid #000; break-after: avoid; }
    p { margin: 0; } ul { margin: 2pt 0 0; padding-left: 14pt; } li { margin: 1.2pt 0; }
    .meta { color: #222; } .job { margin-top: 6pt; break-inside: avoid; } .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 18pt; }
    ul.cols { columns: 2; column-gap: 18pt; } ul.cols li { break-inside: avoid; }
    mark { background: #fff200; }
  </style></head><body>
    <h1>${esc(d.name)}</h1>
    <p>${h(d.address)} · ${h(d.phone)} · ${h(d.email)}</p>
    <div class="grid" style="margin-top:6pt">
      <p><strong>Citizenship:</strong> ${h(d.citizenship)}</p><p><strong>Security clearance:</strong> ${h(d.clearance)}</p>
      <p><strong>Veterans’ preference:</strong> ${h(d.veteransPreference)}</p><p><strong>Federal status:</strong> ${h(d.federalStatus)}</p>
      <p><strong>Availability:</strong> ${h(d.availability)}</p><p><strong>Objective:</strong> ${h(d.targetTitle)}</p>
    </div>
    <h2>Summary</h2><p>${h(d.summary)}</p>
    <h2>Work Experience</h2>${jobs}
    ${projects ? `<h2>Projects</h2>${projects}` : ""}
    <h2>Education</h2><ul>${d.education.map((e) => `<li>${h(eduLine(e))}</li>`).join("")}</ul>
    <h2>Certifications</h2><ul class="cols">${d.certifications.map((c) => `<li>${h(certLine(c))}</li>`).join("")}</ul>
    <h2>Technical Skills</h2><ul>${d.skills.map((s) => `<li>${h(s)}</li>`).join("")}</ul>
    <h2>Additional Information</h2><ul>${d.additional.map((s) => `<li>${h(s)}</li>`).join("")}</ul>
  </body></html>`;
}

// ---------- Word (.docx): same content, editable, with fill-in spots highlighted ----------
const FONT = "Arial";
const PAGE = { width: 12240, height: 15840 }; // US Letter
const MARGIN_X = 864; // 0.6"
const RIGHT = PAGE.width - 2 * MARGIN_X;

const runs = (s: string, opts: { bold?: boolean; color?: string } = {}) =>
  s.split(FILL).filter(Boolean).map((part) =>
    new TextRun({ text: part, ...opts, ...(FILL.test(part) ? { highlight: "yellow" } : {}) }),
  );

function renderDocx(d: Federal) {
  const heading = (text: string) => new Paragraph({ heading: "Heading1", children: [new TextRun(text)] });
  const bullet = (s: string) => new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: runs(s) });
  const meta = (s: string, keepNext = true) => new Paragraph({ keepNext, children: runs(s, { color: "222222" }) });
  const label = (k: string, v: string) => [new TextRun({ text: `${k}: `, bold: true }), ...runs(v)];
  const pair = (a: [string, string], b: [string, string]) =>
    new Paragraph({
      tabStops: [{ type: TabStopType.LEFT, position: Math.round(RIGHT / 2) }],
      children: [...label(...a), new TextRun("\t"), ...label(...b)],
    });

  const jobs = d.experience.flatMap((j, i) => [
    new Paragraph({
      keepNext: true,
      spacing: { before: i ? 140 : 40 },
      children: [...runs(j.title, { bold: true }), ...runs(`, ${j.employer}, ${j.employerAddress}`)],
    }),
    meta(jobMeta(j)),
    ...(j.supervisor ? [meta(`Supervisor: ${j.supervisor}`)] : []),
    ...j.duties.map(bullet),
  ]);
  const projects = (d.projects ?? []).flatMap((p, i) => [
    new Paragraph({
      keepNext: true,
      spacing: { before: i ? 140 : 40 },
      children: [...runs(p.title, { bold: true }), ...(p.dates ? runs(`, ${p.dates}`) : [])],
    }),
    meta(p.organization),
    ...p.duties.map(bullet),
  ]);

  const doc = new Document({
    creator: d.name,
    title: `${d.name} — Federal Resume`,
    styles: {
      default: { document: { run: { font: FONT, size: 20 }, paragraph: { spacing: { after: 0, line: 252 } } } },
      paragraphStyles: [{
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: FONT, size: 22, bold: true, color: "000000" },
        paragraph: {
          spacing: { before: 200, after: 60 }, keepNext: true, outlineLevel: 0,
          border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: "000000", space: 1 } },
        },
      }],
    },
    numbering: {
      config: [{
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 300, hanging: 220 }, spacing: { after: 20 } } },
        }],
      }],
    },
    sections: [{
      properties: { page: { size: PAGE, margin: { top: 720, bottom: 720, left: MARGIN_X, right: MARGIN_X } } },
      children: [
        new Paragraph({ children: [new TextRun({ text: d.name, bold: true, size: 34 })] }),
        new Paragraph({ children: runs(`${d.address} · ${d.phone} · ${d.email}`) }),
        new Paragraph({ spacing: { before: 100 }, children: [] }),
        pair(["Citizenship", d.citizenship], ["Security clearance", d.clearance]),
        pair(["Veterans’ preference", d.veteransPreference], ["Federal status", d.federalStatus]),
        pair(["Availability", d.availability], ["Objective", d.targetTitle]),
        heading("Summary"),
        new Paragraph({ children: runs(d.summary) }),
        heading("Work Experience"),
        ...jobs,
        ...(projects.length ? [heading("Projects"), ...projects] : []),
        heading("Education"),
        ...d.education.map((e) => bullet(eduLine(e))),
        heading("Certifications"),
        ...d.certifications.map((c) => bullet(certLine(c))),
        heading("Technical Skills"),
        ...d.skills.map(bullet),
        heading("Additional Information"),
        ...d.additional.map(bullet),
      ],
    }],
  });
  return Packer.toBuffer(doc);
}

(async () => {
  const src = existsSync(SRC) ? SRC : "scripts/federal.template.json";
  if (src !== SRC) console.warn(`No ${SRC} yet: building a preview from the template.`);
  const raw = readFileSync(src, "utf8");
  const data = JSON.parse(raw) as Federal;

  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage();
  await page.setContent(renderHtml(data), { waitUntil: "load" });
  const pdf = await page.pdf({ path: `${OUT}.pdf`, format: "Letter", preferCSSPageSize: true, printBackground: true });
  await browser.close();
  const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  console.log(`wrote ${OUT}.pdf (${pages} page${pages > 1 ? "s" : ""})`);
  if (pages > 2) console.warn("Over the two-page USAJOBS limit: shorten duties or older positions.");

  writeFileSync(`${OUT}.docx`, await renderDocx(data));
  console.log(`wrote ${OUT}.docx`);

  const todo = raw.match(new RegExp(FILL.source, "g")) ?? [];
  if (todo.length) console.log(`Still to fill in (${todo.length}):\n  ${todo.join("\n  ")}`);
})();
