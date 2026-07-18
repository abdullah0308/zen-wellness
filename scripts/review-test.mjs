// End-to-end review flow test, driven through the real UI:
// 1. submits a review via the /coaching testimonials form
// 2. verifies it renders in the reviews grid
// 3. unlocks /admin with the password and deletes it via the UI
//
//   node scripts/review-test.mjs [baseUrl] [adminPassword]

import puppeteer from "puppeteer-core";
import { existsSync } from "node:fs";

const baseUrl = process.argv[2] ?? "http://localhost:3100";
const adminPassword = process.argv[3] ?? "zen-admin";
const marker = `E2E test review ${Date.now()} — please delete me.`;

const CHROME_PATHS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
];
const chrome = CHROME_PATHS.find((p) => existsSync(p));

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: "new",
  args: ["--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

let failed = false;
const check = (ok, label) => {
  console.log(`${ok ? "PASS" : "FAIL"}: ${label}`);
  if (!ok) failed = true;
};

// 1. submit a review through the UI
await page.goto(`${baseUrl}/coaching`, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 1500)); // hydration
await page.evaluate(() =>
  document.querySelector("#reviews")?.scrollIntoView({ behavior: "instant" })
);
await new Promise((r) => setTimeout(r, 500));
const buttons = await page.$$("#reviews button");
for (const b of buttons) {
  const t = await b.evaluate((el) => el.textContent);
  if (t?.includes("Leave a review")) {
    await b.click();
    break;
  }
}
await page.waitForSelector("#rv-name", { timeout: 5000 });
await page.type("#rv-name", "E2E Tester");
await page.click('#reviews button[aria-label="4 stars"]');
await page.type("#rv-text", marker);
const publish = await page.$$("#reviews button[type=submit]");
await publish[0].click();
await page.waitForFunction(
  () => document.querySelector("#reviews form")?.textContent?.includes("Thank you"),
  { timeout: 5000 }
);
check(true, "review submitted via UI form");

const inGrid = await page.evaluate(
  (m) => document.querySelector("#reviews")?.textContent?.includes(m),
  marker
);
check(inGrid, "review appears in the grid immediately");

// 2. delete it through the admin UI
await page.goto(`${baseUrl}/admin`, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 1200));
await page.type("input[type=password]", adminPassword);
await page.keyboard.press("Enter");
await page.waitForFunction(
  () => document.body.textContent?.includes("review"),
  { timeout: 5000 }
);
await new Promise((r) => setTimeout(r, 800));
const listed = await page.evaluate((m) => document.body.textContent?.includes(m), marker);
check(listed, "review listed in admin");

page.on("dialog", (d) => d.accept());
const deleted = await page.evaluate(async (m) => {
  const cards = [...document.querySelectorAll("article")];
  const card = cards.find((c) => c.textContent?.includes(m));
  const btn = [...(card?.querySelectorAll("button") ?? [])].find((b) =>
    b.textContent?.includes("Delete")
  );
  if (!btn) return false;
  btn.click();
  return true;
}, marker);
check(deleted, "clicked delete in admin UI");
await new Promise((r) => setTimeout(r, 1200));
const stillThere = await page.evaluate(
  (m) => document.body.textContent?.includes(m),
  marker
);
check(!stillThere, "review removed from admin list");

// 3. confirm gone from the public page
const res = await fetch(`${baseUrl}/api/reviews?category=coaching`);
const data = await res.json();
check(
  !data.reviews.some((r) => r.text === marker),
  "review gone from public API"
);

await browser.close();
process.exit(failed ? 1 : 0);
