// Builds the PRIVATE US federal resume (USAJOBS) from private/federal.json into private/.
// Nothing here is part of the website. Run: npm run federal
// OPM limits USAJOBS resumes to two pages (Merit Hiring Plan, effective 27 Sep 2025): the script warns if it runs over.
import { chromium } from "playwright-core";
import { existsSync, readFileSync } from "node:fs";

type Job = {
  title: string; employer: string; employerAddress: string; start: string; end: string;
  hoursPerWeek: number | string; seriesGrade?: string; salary?: string; supervisor?: string; duties: string[];
};
type Federal = {
  name: string; address: string; phone: string; email: string; citizenship: string; clearance: string;
  veteransPreference: string; federalStatus: string; availability: string; targetTitle: string; summary: string;
  experience: Job[]; education: { degree: string; school: string; location: string; completed: string }[];
  certifications: { name: string; date: string }[]; skills: string[]; additional: string[];
};

const SRC = "private/federal.json";
const OUT = "private/Haig-Tientcheu-Federal-Resume.pdf";
const CHROME = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

function render(d: Federal) {
  const jobs = d.experience
    .map((j) => {
      const meta = [
        `${esc(j.start)} – ${esc(j.end)}`,
        typeof j.hoursPerWeek === "number" ? `${j.hoursPerWeek} hours per week` : `Hours per week: ${esc(j.hoursPerWeek)}`,
        j.seriesGrade && `Series/Grade: ${esc(j.seriesGrade)}`,
        j.salary && `Salary: ${esc(j.salary)}`,
      ].filter(Boolean).join(" · ");
      return `<div class="job">
        <p><strong>${esc(j.title)}</strong>, ${esc(j.employer)}, ${esc(j.employerAddress)}</p>
        <p class="meta">${meta}</p>
        ${j.supervisor ? `<p class="meta">Supervisor: ${esc(j.supervisor)}</p>` : ""}
        <ul>${j.duties.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      </div>`;
    })
    .join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(d.name)} — Federal Resume</title><style>
    @page { size: Letter; margin: 0.5in 0.6in; }
    body { font: 10.5pt/1.38 Arial, Helvetica, sans-serif; color: #000; font-variant-ligatures: none; }
    h1 { font-size: 17pt; margin: 0; } h2 { font-size: 11pt; margin: 11pt 0 4pt; padding-bottom: 2pt; border-bottom: 1.5pt solid #000; }
    p { margin: 0; } ul { margin: 3pt 0 0; padding-left: 14pt; } li { margin: 1.5pt 0; }
    .meta { color: #222; } .job { margin-top: 7pt; break-inside: avoid; } .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 18pt; }
  </style></head><body>
    <h1>${esc(d.name)}</h1>
    <p>${esc(d.address)} · ${esc(d.phone)} · ${esc(d.email)}</p>
    <div class="grid" style="margin-top:6pt">
      <p><strong>Citizenship:</strong> ${esc(d.citizenship)}</p><p><strong>Security clearance:</strong> ${esc(d.clearance)}</p>
      <p><strong>Veterans’ preference:</strong> ${esc(d.veteransPreference)}</p><p><strong>Federal status:</strong> ${esc(d.federalStatus)}</p>
      <p><strong>Availability:</strong> ${esc(d.availability)}</p><p><strong>Objective:</strong> ${esc(d.targetTitle)}</p>
    </div>
    <h2>Summary</h2><p>${esc(d.summary)}</p>
    <h2>Work Experience</h2>${jobs}
    <h2>Education</h2><ul>${d.education.map((e) => `<li>${esc(e.degree)}, ${esc(e.school)}, ${esc(e.location)}, completed ${esc(e.completed)}</li>`).join("")}</ul>
    <h2>Certifications</h2><ul>${d.certifications.map((c) => `<li>${esc(c.name)} (${esc(c.date)})</li>`).join("")}</ul>
    <h2>Technical Skills</h2><ul>${d.skills.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
    <h2>Additional Information</h2><ul>${d.additional.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
  </body></html>`;
}

(async () => {
  const src = existsSync(SRC) ? SRC : "scripts/federal.template.json";
  if (src !== SRC) console.warn(`No ${SRC} yet: building a preview from the template.`);
  const data = JSON.parse(readFileSync(src, "utf8")) as Federal;
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage();
  await page.setContent(render(data), { waitUntil: "load" });
  const pdf = await page.pdf({ path: OUT, format: "Letter", preferCSSPageSize: true });
  await browser.close();
  const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  console.log(`wrote ${OUT} (${pages} page${pages > 1 ? "s" : ""})`);
  if (pages > 2) console.warn("Over the two-page USAJOBS limit: shorten duties or older positions.");
})();
