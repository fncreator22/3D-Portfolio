import { chromium } from "playwright";

async function testHoverScrub() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  await page.evaluate(() => {
    document.getElementById("projects")?.scrollIntoView();
  });
  await page.waitForTimeout(1000);

  const cards = page.locator("#projects-carousel .group");
  const count = await cards.count();
  console.log(`Found ${count} cards. Starting rapid scrub...`);

  // Hover over card 1
  await cards.nth(0).hover();
  await page.waitForTimeout(200);

  // Rapidly hover card 2
  await cards.nth(1).hover();
  await page.waitForTimeout(200);

  // Rapidly hover card 3
  await cards.nth(2).hover();
  await page.waitForTimeout(200);

  // Unhover by moving mouse to header
  await page.locator("#projects-heading").hover();
  await page.waitForTimeout(500);

  // Verify cards all return to resting height
  const bboxes = [];
  for (let i = 0; i < 3; i++) {
    const box = await cards.nth(i).boundingBox();
    bboxes.push(box);
    console.log(`Card ${i + 1} resting height: ${box?.height}px`);
  }

  // All resting cards should have similar compact heights (around 280-320px)
  for (let i = 0; i < 3; i++) {
    if (bboxes[i].height > 350) {
      console.error(`ERROR: Card ${i + 1} remained expanded or stretched: ${bboxes[i].height}px`);
      process.exit(1);
    }
  }

  console.log("✓ Rapid hover scrub passed! All cards collapse cleanly back to resting height without sticking!");
  await browser.close();
}

testHoverScrub();
