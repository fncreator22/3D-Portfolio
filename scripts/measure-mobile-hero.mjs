import { chromium } from "playwright";

async function measure() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto("http://localhost:3000");
  await page.waitForTimeout(2000);
  const eyebrow = await page.locator(".eyebrow").first().boundingBox();
  const h1 = await page.locator("h1").boundingBox();
  const p = await page.locator("h1 + p").boundingBox();
  const avatar = await page.locator(".block.lg\\:hidden").boundingBox();
  const buttons = await page.locator("text=Explore 16 Systems").boundingBox();
  const chips = await page.locator("text=Flagship:").boundingBox();
  console.log(JSON.stringify({ eyebrow, h1, p, avatar, buttons, chips }, null, 2));
  await page.screenshot({ path: "test-mobile-hero-measured.png" });
  await browser.close();
}

measure().catch(console.error);
