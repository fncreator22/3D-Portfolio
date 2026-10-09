import { chromium } from "playwright";

async function diagnose() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });

  // 1. Mobile viewport (390 x 844)
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  const page = await mobileCtx.newPage();

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // Mobile Hero
  await page.screenshot({ path: "diag-mobile-hero.png" });

  // Mobile scroll increments through transition 1 into Identity
  const scrollSteps = [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600];
  for (const y of scrollSteps) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await page.waitForTimeout(200);
    await page.screenshot({ path: `diag-mobile-scroll-${y}.png` });
  }

  // Mobile Identity scroll
  await page.evaluate(() => {
    document.getElementById("identity")?.scrollIntoView({ behavior: "instant" });
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: "diag-mobile-identity-view.png" });

  // Mobile Section 5
  await page.evaluate(() => {
    document.getElementById("thinking")?.scrollIntoView({ behavior: "instant" });
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: "diag-mobile-thinking-view.png" });

  await browser.close();
  console.log("Diagnosis screenshots captured!");
}

diagnose().catch(console.error);
