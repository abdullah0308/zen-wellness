import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
  args: ["--disable-gpu"],
});
const page = await browser.newPage();
// The booking form lives on the vertical landing pages, not the gateway.
await page.goto("http://localhost:3100/massage", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 1500)); // let React hydrate before interacting

// capture window.open instead of opening a tab
await page.evaluate(() => {
  window.__opened = null;
  window.open = (url) => { window.__opened = url; return null; };
});

page.on("console", (m) => console.log("PAGE:", m.text()));
page.on("pageerror", (e) => console.log("PAGEERROR:", e.message));

await page.type("#bk-name", "Test User");
await page.select("#bk-service", "Deep Tissue Massage");
await page.type("#bk-area", "Quatre Bornes");
await page.type("#bk-notes", "Lower back tension");
const state = await page.evaluate(() => {
  const form = document.querySelector("#book form");
  const btn = form?.querySelector("button[type=submit]");
  return { hasForm: !!form, hasBtn: !!btn, valid: form?.checkValidity() };
});
console.log("STATE:", JSON.stringify(state));
await page.click("#book button[type=submit]");
await new Promise((r) => setTimeout(r, 500));

const url = await page.evaluate(() => window.__opened);
console.log("OPENED:", url);
console.log("DECODED:", decodeURIComponent((url ?? "").split("text=")[1] ?? ""));
await browser.close();
