// Builds the editable Word resumes (.docx), EN and FR, from the same content as the PDF resume page.
// Run: npm run docx   (reads .env.local so the phone number is included, like the PDF)
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

if (existsSync(".env.local")) process.loadEnvFile(".env.local");

import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  LevelFormat,
  Packer,
  Paragraph,
  TabStopType,
  TextRun,
} from "docx";

const FONT = "Calibri";
// US Letter, 0.6" side margins: text width = 12240 - 2 * 864
const PAGE = { width: 12240, height: 15840 };
const MARGIN = 864;
const RIGHT_TAB = PAGE.width - 2 * MARGIN;

async function build(lang: "en" | "fr") {
  // Imported after the env file is loaded, so contact.phone sees CONTACT_PHONE.
  const { SITE_URL, contact } = await import("../src/config/site");
  const { getProfile } = await import("../src/content/profile");
  const { getDictionary } = await import("../src/i18n/dictionary");

  const p = getProfile(lang);
  const t = getDictionary(lang);
  const r = p.resume;
  const site = SITE_URL.replace(/^https:\/\//, "");
  const extra = p.facts.slice(1).map((f) => f.label).join(" · ");
  const L = lang === "fr"
    ? { projects: "Projets (développement web & vibe coding)", edu: "Formation" }
    : { projects: "Projects (Web Development & Vibe Coding)", edu: "Education" };

  const heading = (text: string) =>
    new Paragraph({ heading: "Heading1", children: [new TextRun(text)] });
  const bullet = (children: TextRun[]) =>
    new Paragraph({ numbering: { reference: "bullets", level: 0 }, children });
  const link = (text: string, href: string) =>
    new ExternalHyperlink({ link: href, children: [new TextRun({ text, color: "1F3A5F" })] });
  // Job title on the left, dates right-aligned on the same line
  const split = (left: TextRun, right: string, before = 0) =>
    new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
      keepNext: true,
      spacing: { before, after: 0 },
      children: [left, new TextRun(`\t${right}`)],
    });

  const jobs = p.jobs.filter((j) => !j.siteOnly).flatMap((j, i) => [
    split(new TextRun({ text: j.title, bold: true }), j.dates, i > 0 ? 140 : 0),
    new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
      keepNext: true,
      spacing: { after: 40 },
      children: [
        new TextRun({
          text: j.company + (j.client ? ` — ${j.client.replace(/^Client ?: /, "Client: ")}` : ""),
          color: "444444",
        }),
        new TextRun({ text: `\t${j.location}`, color: "444444" }),
      ],
    }),
    ...j.bullets.map((b) => bullet([new TextRun(b)])),
  ]);

  const contactLine = [
    new TextRun(`${contact.location} · ${contact.phone ? `${contact.phone} · ` : ""}`),
    link(contact.email, `mailto:${contact.email}`),
    new TextRun(" · "),
    link("linkedin.com/in/haig-tientcheu", contact.linkedin),
    new TextRun(" · "),
    link(site, SITE_URL),
  ];

  const doc = new Document({
    creator: p.name,
    title: `${p.name} — ${t.resume.title}`,
    styles: {
      default: { document: { run: { font: FONT, size: 20 }, paragraph: { spacing: { after: 0, line: 264 } } } },
      paragraphStyles: [
        {
          id: "Heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { font: FONT, size: 22, bold: true, color: "000000" },
          paragraph: {
            spacing: { before: 200, after: 80 },
            keepNext: true,
            outlineLevel: 0,
            border: { bottom: { style: BorderStyle.SINGLE, size: 10, color: "000000", space: 1 } },
          },
        },
      ],
    },
    numbering: {
      config: [
        {
          reference: "bullets",
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: "•",
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 300, hanging: 220 }, spacing: { after: 20 } } },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: { page: { size: PAGE, margin: { top: 720, bottom: 720, left: MARGIN, right: MARGIN } } },
        children: [
          new Paragraph({ children: [new TextRun({ text: p.name.toUpperCase(), bold: true, size: 36 })] }),
          new Paragraph({ spacing: { before: 40 }, children: [new TextRun({ text: p.title, size: 21 })] }),
          new Paragraph({ spacing: { before: 40 }, children: contactLine }),
          new Paragraph({ children: [new TextRun({ text: extra, color: "444444" })] }),

          heading(t.resume.summary),
          new Paragraph({ children: [new TextRun(r.summary)] }),

          heading(t.resume.experience),
          ...jobs,

          heading(L.projects),
          ...r.projects.map((x) => bullet([new TextRun(x)])),

          heading(L.edu),
          ...p.education.map((e) => bullet([new TextRun({ text: e.degree, bold: true }), new TextRun(`, ${e.school}`)])),

          heading(t.resume.certifications),
          ...p.certifications.map((c) => bullet([new TextRun(c.name)])),

          heading(t.resume.skills),
          ...r.skills.map(
            (s) =>
              new Paragraph({
                spacing: { after: 30 },
                children: [new TextRun({ text: `${s.label}: `, bold: true }), new TextRun(s.items)],
              }),
          ),

          heading(t.resume.leadership),
          ...r.leadership.map((c) => bullet([new TextRun(c)])),
        ],
      },
    ],
  });

  return Packer.toBuffer(doc);
}

const jobs = [
  { lang: "en" as const, out: "public/resume/Haig-Tientcheu-Resume-EN.docx" },
  { lang: "fr" as const, out: "public/resume/Haig-Tientcheu-CV-FR.docx" },
];

(async () => {
  mkdirSync("public/resume", { recursive: true });
  for (const job of jobs) {
    writeFileSync(job.out, await build(job.lang));
    console.log("wrote", job.out);
  }
})();
