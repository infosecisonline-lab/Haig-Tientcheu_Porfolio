// Records a short muted scroll-through of SongFromWithin for the Work section.
// Run: npx tsx scripts/capture-video.ts   (needs: npx playwright-core install ffmpeg)
import { chromium } from "playwright-core";
import { renameSync, readdirSync, rmSync, mkdirSync } from "node:fs";

const CHROME = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT = "public/work/video-tmp";

(async () => {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: CHROME });
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    recordVideo: { dir: OUT, size: { width: 1280, height: 800 } },
  });
  const page = await ctx.newPage();
  await page.goto("https://songfromwithin.com", { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
  // The consent banner appears after a delay: wait for it, dismiss it, then let the page settle.
  const reject = page.getByRole("button", { name: "Reject", exact: true }).first();
  await reject.waitFor({ state: "visible", timeout: 15000 }).catch(() => {});
  for (let i = 0; i < 10 && (await reject.isVisible().catch(() => false)); i++) {
    await reject.click({ timeout: 2000 }).catch(() => {});
    await page.waitForTimeout(700);
  }
  console.log("banner still visible:", await reject.isVisible().catch(() => false));
  await page.waitForTimeout(2000);
  for (let i = 0; i < 60; i++) { await page.mouse.wheel(0, 28); await page.waitForTimeout(90); }
  await page.waitForTimeout(1200);
  for (let i = 0; i < 60; i++) { await page.mouse.wheel(0, -28); await page.waitForTimeout(90); }
  await page.waitForTimeout(800);
  await ctx.close();
  await browser.close();
  const file = readdirSync(OUT).find((f) => f.endsWith(".webm"));
  if (file) renameSync(`${OUT}/${file}`, "public/work/songfromwithin-scroll.webm");
  rmSync(OUT, { recursive: true, force: true });
  console.log("video:", file ? "public/work/songfromwithin-scroll.webm" : "none");
})();
