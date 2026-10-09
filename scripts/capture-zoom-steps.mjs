import { chromium } from "playwright";

async function captureZoomSteps() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const H = 800;
  // Hero is at 0..800
  // Portal pin is from 800 to 800 + 800*1.3 = 1840

  const steps = [
    { name: "zoom-01-enter", top: H * 1.05 },
    { name: "zoom-02-mid", top: H * 1.45 },
    { name: "zoom-03-expanding", top: H * 1.85 },
    { name: "zoom-04-landed", top: H * 2.25 },
    { name: "zoom-05-identity-full", top: H * 2.50 },
  ];

  for (const step of steps) {
    await page.evaluate((top) => {
      window.scrollTo({ top, behavior: "instant" });
    }, step.top);
    await page.waitForTimeout(400);
    await page.screenshot({ path: `test-${step.name}.png` });
    console.log(`Captured test-${step.name}.png at scroll ${step.top}`);
  }

  await browser.close();
}

captureZoomSteps();
