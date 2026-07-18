// Screenshot driver: captures every page/section with real scrolling so
// scroll-reveal animations have fired before each capture.
//
//   node scripts/screenshot.mjs [baseUrl] [outDir]
//
// Defaults: baseUrl http://localhost:3100, outDir ./screenshots

import puppeteer from "puppeteer-core";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const CHROME_PATHS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
];

const baseUrl = process.argv[2] ?? "http://localhost:3100";
const outDir = process.argv[3] ?? "screenshots";
mkdirSync(outDir, { recursive: true });

const chrome = CHROME_PATHS.find((p) => existsSync(p));
if (!chrome) throw new Error("No Chrome/Edge found");

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: "new",
  args: ["--disable-gpu", "--hide-scrollbars"],
});

async function capture(page, name, selector) {
  if (selector) {
    await page.evaluate((sel) => {
      document.querySelector(sel)?.scrollIntoView({ behavior: "instant", block: "start" });
    }, selector);
    await new Promise((r) => setTimeout(r, 900)); // let reveals finish
  }
  await page.screenshot({ path: path.join(outDir, `${name}.png`) });
  console.log(`captured ${name}.png`);
}

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

// gateway
await page.goto(baseUrl, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 600));
await capture(page, "gateway");

// per-vertical landing pages
for (const vertical of ["massage", "coaching"]) {
  await page.goto(`${baseUrl}/${vertical}`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));
  await capture(page, `${vertical}-hero`);
  await capture(page, `${vertical}-services`, "#services");
  await capture(page, `${vertical}-home-visits`, "#home-visits");
  await capture(page, `${vertical}-why-us`, "#why-us");
  await capture(page, `${vertical}-reviews`, "#reviews");
  await capture(page, `${vertical}-book`, "#book");
}

// admin
await page.goto(`${baseUrl}/admin`, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 400));
await capture(page, "admin-locked");

// mobile
const mob = await browser.newPage();
await mob.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await mob.goto(baseUrl, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 600));
await capture(mob, "mobile-gateway");
await mob.goto(`${baseUrl}/massage`, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 600));
await capture(mob, "mobile-massage-hero");
await capture(mob, "mobile-massage-reviews", "#reviews");

await browser.close();
console.log("done");
