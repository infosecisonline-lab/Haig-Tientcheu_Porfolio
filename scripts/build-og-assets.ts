// Rasterizes the certification badges used on the social share card (assets/og/).
// The OG image renderer reads PNG reliably; the Microsoft badges are SVG.
// Run: npx tsx scripts/build-og-assets.ts
import { chromium } from "playwright-core";
import { readFileSync, copyFileSync } from "node:fs";

const CHROME = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width: 220, height: 220 }, deviceScaleFactor: 1 });
  for (const name of ["ms-expert", "ms-associate"]) {
    const svg = readFileSync(`public/badges/${name}.svg`, "utf8");
    await page.setContent(`<html><body style="margin:0;background:transparent"><div style="width:220px;height:220px;display:grid;place-items:center">${svg.replace("<svg", '<svg style="width:210px;height:210px"')}</div></body></html>`);
    await page.screenshot({ path: `assets/og/${name}.png`, omitBackground: true });
  }
  await browser.close();
  for (const name of ["securityx", "cysa", "pentest", "sscp", "secplus"]) copyFileSync(`public/badges/${name}.png`, `assets/og/${name}.png`);
  console.log("og badges ready");
})();
