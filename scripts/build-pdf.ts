// Prints the resume pages to US Letter PDFs (real, selectable text for ATS parsers).
// Start the site first (npm run build && npm start), then: npx tsx scripts/build-pdf.ts [baseUrl]
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const BASE = process.argv[2] ?? "http://localhost:3000";
const CHROME = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";

const jobs = [
  { url: "/en/resume", out: "public/resume/Haig-Tientcheu-Resume-EN.pdf" },
  { url: "/fr/resume", out: "public/resume/Haig-Tientcheu-CV-FR.pdf" },
];

(async () => {
  mkdirSync("public/resume", { recursive: true });
  const browser = await chromium.launch({ executablePath: CHROME });
  const ctx = await browser.newContext({ colorScheme: "light" });
  for (const job of jobs) {
    const page = await ctx.newPage();
    await page.goto(BASE + job.url, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print", colorScheme: "light" });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({ path: job.out, format: "Letter", printBackground: false, preferCSSPageSize: true });
    await page.close();
    console.log("wrote", job.out);
  }
  await browser.close();
})();
