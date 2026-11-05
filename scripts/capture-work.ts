// Captures real screenshots of Haig's products for the Work section.
// Run: npx tsx scripts/capture-work.ts   (uses the locally installed Chrome)
import { chromium } from "playwright-core";

const CHROME = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";

const shots = [
  { name: "songfromwithin", url: "https://songfromwithin.com" },
  { name: "stoknextra", url: "https://www.stoknextra.com" },
  { name: "wayofhope", url: "https://www.thewayofhopeglobal.org" },
];

async function dismissConsent(page: import("playwright-core").Page) {
  for (const label of ["Reject", "Refuser", "Accept", "Accepter"]) {
    const btn = page.getByRole("button", { name: label, exact: true });
    if (await btn.count()) {
      await btn.first().click().catch(() => {});
      await page.waitForTimeout(600);
      return;
    }
  }
}

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME });
  for (const s of shots) {
    for (const vp of [
      { tag: "desktop", width: 1440, height: 900, scale: 1 },
      { tag: "mobile", width: 390, height: 844, scale: 2 },
    ]) {
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: vp.scale,
        reducedMotion: "reduce",
      });
      const page = await ctx.newPage();
      await page.goto(s.url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
      await page.waitForTimeout(2500);
      await dismissConsent(page);
      await page.waitForTimeout(800);
      await page.screenshot({ path: `public/work/${s.name}-${vp.tag}.jpg`, type: "jpeg", quality: 82 });
      if (vp.tag === "desktop") {
        await page.screenshot({
          path: `public/work/${s.name}-desktop-tall.jpg`, type: "jpeg", quality: 80, fullPage: false,
          clip: { x: 0, y: 0, width: 1440, height: 900 },
        });
        await page.evaluate(() => window.scrollTo(0, 900));
        await page.waitForTimeout(1500);
        await page.screenshot({ path: `public/work/${s.name}-desktop-2.jpg`, type: "jpeg", quality: 80 });
      }
      await ctx.close();
    }
    console.log("captured", s.name);
  }
  await browser.close();
})();
