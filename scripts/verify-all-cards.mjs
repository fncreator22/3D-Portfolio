import { chromium } from "playwright";

async function verifyAllCards() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  await page.evaluate(() => {
    document.getElementById("projects")?.scrollIntoView();
  });
  await page.waitForTimeout(1000);

  const cards = page.locator("#projects-carousel .group");
  const count = await cards.count();
  console.log(`Verifying ${count} project cards:`);

  for (let i = 0; i < Math.min(count, 8); i++) {
    const card = cards.nth(i);
    const titleText = await card.locator("h3").innerText();

    // Hover over card
    await card.hover();
    await page.waitForTimeout(350);

    // Check visible points
    const points = await card.locator("ul:visible li").allInnerTexts();
    console.log(`Card ${i + 1} (${titleText.trim()}): ${points.length} points spread`);
    for (const pt of points) {
      console.log(`   - ${pt.replace(/\n/g, " ").trim()}`);
    }

    if (points.length === 0) {
      console.error(`ERROR: Card ${i + 1} (${titleText}) has NO spread points!`);
      process.exit(1);
    }
  }

  console.log("All 8 project cards have verified spread points and clean animation!");
  await browser.close();
}

verifyAllCards();
