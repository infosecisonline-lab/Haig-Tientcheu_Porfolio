// Smoke test: loads the main pages in light and dark mode, reports console errors
// (including CSP violations) and saves screenshots to .taste-skill/check/.
// Run with the site started: npx tsx scripts/check-site.ts [baseUrl]
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const BASE = process.argv[2] ?? "http://localhost:3100";
const CHROME = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT = ".taste-skill/check";

(async () => {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: CHROME });
  const problems: string[] = [];

  for (const scheme of ["light", "dark"] as const) {
    for (const vp of [{ tag: "desktop", width: 1440, height: 900 }, { tag: "mobile", width: 390, height: 844 }]) {
      const ctx = await browser.newContext({ viewport: vp, colorScheme: scheme, deviceScaleFactor: 1 });
      const page = await ctx.newPage();
      page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") problems.push(`[${scheme} ${vp.tag}] ${m.text()}`); });
      page.on("pageerror", (e) => problems.push(`[${scheme} ${vp.tag}] pageerror ${e.message}`));

      await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
      await page.screenshot({ path: `${OUT}/${scheme}-${vp.tag}-home.jpg`, type: "jpeg", quality: 70 });

      if (scheme === "light") {
        await page.getByRole("button", { name: "nessus" }).first().click();
        await page.locator("#expertise").scrollIntoViewIfNeeded();
        await page.screenshot({ path: `${OUT}/${scheme}-${vp.tag}-query.jpg`, type: "jpeg", quality: 70 });
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.getByRole("link", { name: "Save my contact" }).first().click();
        await page.waitForTimeout(500);
        const open = await page.locator("dialog#vcard").evaluate((d) => (d as HTMLDialogElement).open);
        if (!open) problems.push(`[${vp.tag}] card dialog did not open`);
        await page.screenshot({ path: `${OUT}/${scheme}-${vp.tag}-modal.jpg`, type: "jpeg", quality: 70 });
        await page.keyboard.press("Escape");
        await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
        // scroll through so every section plays its entrance before the full-page capture
        const height = await page.evaluate(() => document.body.scrollHeight);
        for (let y = 0; y < height; y += 500) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(120); }
        await page.waitForTimeout(900);
        await page.screenshot({ path: `${OUT}/${scheme}-${vp.tag}-full.jpg`, type: "jpeg", quality: 60, fullPage: true });
      }

      await page.goto(`${BASE}/fr/card`, { waitUntil: "networkidle" });
      await page.screenshot({ path: `${OUT}/${scheme}-${vp.tag}-card.jpg`, type: "jpeg", quality: 70, fullPage: true });
      await page.goto(`${BASE}/en/resume`, { waitUntil: "networkidle" });
      await page.screenshot({ path: `${OUT}/${scheme}-${vp.tag}-resume.jpg`, type: "jpeg", quality: 70, fullPage: true });
      await ctx.close();
    }
  }
  await browser.close();
  console.log(problems.length ? problems.join("\n") : "No console errors or CSP violations.");
})();
