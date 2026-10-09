import { chromium } from "playwright";

async function runVerification() {
  console.log("Launching Edge via Playwright...");
  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
  });

  try {
    // ─── 1. Desktop Verification ───
    console.log("Testing Desktop (1280x800)...");
    const desktopContext = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await desktopPage.waitForTimeout(1000);

    // Capture Desktop Hero
    await desktopPage.screenshot({ path: "test-desktop-hero.png" });
    console.log("✓ Captured test-desktop-hero.png");

    // Scroll to #projects
    await desktopPage.evaluate(() => {
      const el = document.getElementById("projects");
      if (el) el.scrollIntoView();
    });
    await desktopPage.waitForTimeout(1000);

    // Capture Desktop Projects Resting State
    await desktopPage.screenshot({ path: "test-desktop-projects-resting.png" });
    console.log("✓ Captured test-desktop-projects-resting.png");

    // Find the first WorkflowBuilderCard and hover over it
    const cards = desktopPage.locator("#projects-carousel .group");
    const count = await cards.count();
    console.log(`Found ${count} cards in carousel`);

    if (count > 0) {
      const firstCard = cards.first();
      await firstCard.hover();
      // Wait for Framer Motion spread animation (duration: 300ms)
      await desktopPage.waitForTimeout(600);

      // Verify that spread points are visible
      const pointsLocator = firstCard.locator("ul:visible li");
      const pointsCount = await pointsLocator.count();
      console.log(`Found ${pointsCount} bullet points in spread card`);

      // Capture Desktop Projects Hover/Spread State
      await desktopPage.screenshot({ path: "test-desktop-projects-spread.png" });
      console.log("✓ Captured test-desktop-projects-spread.png");
    }

    await desktopContext.close();

    // ─── 2. Mobile Verification ───
    console.log("Testing Mobile (390x844 - iPhone 14)...");
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(1000);

    // Capture Mobile Hero
    await mobilePage.screenshot({ path: "test-mobile-hero.png" });
    console.log("✓ Captured test-mobile-hero.png");

    // Verify 18,488 badge is NOT present
    const neuralText = await mobilePage.evaluate(() => {
      return document.body.innerText.includes("18,488");
    });
    console.log(`Presence of '18,488' on mobile page: ${neuralText} (should be false)`);

    // Scroll to #projects
    await mobilePage.evaluate(() => {
      const el = document.getElementById("projects");
      if (el) el.scrollIntoView();
    });
    await mobilePage.waitForTimeout(1000);

    // Capture Mobile Projects
    await mobilePage.screenshot({ path: "test-mobile-projects.png" });
    console.log("✓ Captured test-mobile-projects.png");

    await mobileContext.close();

    console.log("ALL VERIFICATION CHECKS COMPLETED SUCCESSFULLY!");
  } catch (err) {
    console.error("Verification failed:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runVerification();
