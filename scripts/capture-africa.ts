// Screenshots of the SongFromWithin French-speaking Africa page (CFA prices, Mobile Money).
// Run: npx tsx scripts/capture-africa.ts
import { chromium } from "playwright-core";

const CHROME = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = "https://songfromwithin.com/fr/afrique";

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME });
  for (const vp of [
    { tag: "desktop", width: 1440, height: 900, scale: 1 },
    { tag: "mobile", width: 390, height: 844, scale: 2 },
  ]) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: vp.scale });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
    const reject = page.getByRole("button", { name: /^(Refuser|Reject)$/ }).first();
    await reject.waitFor({ state: "visible", timeout: 8000 }).catch(() => {});
    for (let i = 0; i < 6 && (await reject.isVisible().catch(() => false)); i++) {
      await reject.click({ timeout: 2000 }).catch(() => {});
      await page.waitForTimeout(600);
    }
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `public/work/sfw-africa-${vp.tag}.jpg`, type: "jpeg", quality: 82 });
    if (vp.tag === "desktop") {
      await page.screenshot({ path: `public/work/sfw-africa-full.jpg`, type: "jpeg", quality: 70, fullPage: true });
    }
    await ctx.close();
  }
  await browser.close();
  console.log("captured Africa page");
})();
