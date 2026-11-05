// Screenshots this portfolio's own hero for the "This website" project card.
// Run with the site started on port 3000: npx tsx scripts/capture-self.ts
import { chromium } from "playwright-core";

const CHROME = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = process.argv[2] ?? "http://localhost:3000";

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME });
  for (const vp of [
    { tag: "desktop", width: 1440, height: 900, scale: 1 },
    { tag: "mobile", width: 390, height: 844, scale: 2 },
  ]) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: vp.scale, colorScheme: "light", reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `public/work/portfolio-${vp.tag}.jpg`, type: "jpeg", quality: 82 });
    await ctx.close();
  }
  await browser.close();
  console.log("captured portfolio-desktop.jpg and portfolio-mobile.jpg");
})();
