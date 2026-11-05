// Draws the "HT" monogram with General Sans and saves the site icons.
// Run: npx tsx scripts/make-icons.ts
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";

const CHROME = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const font = readFileSync("src/fonts/GeneralSans-Bold.woff2").toString("base64");

const html = (size: number) => `<!doctype html><html><head><style>
@font-face { font-family: G; src: url(data:font/woff2;base64,${font}) format("woff2"); font-weight: 700; }
html, body { margin: 0; }
div { width: ${size}px; height: ${size}px; background: #111111; color: #ffffff; display: grid; place-items: center;
  font: 700 ${Math.round(size * 0.46)}px/1 G; letter-spacing: -0.04em; }
</style></head><body><div>HT</div></body></html>`;

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME });
  for (const [size, out] of [
    [512, "public/icon-512.png"],
    [192, "src/app/icon.png"],
    [180, "src/app/apple-icon.png"],
  ] as const) {
    const page = await browser.newPage({ viewport: { width: size, height: size } });
    await page.setContent(html(size));
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: out, omitBackground: false });
    await page.close();
    console.log("wrote", out);
  }
  await browser.close();
})();
