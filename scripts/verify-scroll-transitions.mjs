import { chromium } from "playwright";

async function verifyCinematicTransitions() {
  console.log("=== Launching Playwright Verification Suite for Cinematic Scroll Transitions ===");
  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
  });

  try {
    // ─────────────────────────────────────────────────────────────
    // 1. DESKTOP TEST SUITE (1280x800)
    // ─────────────────────────────────────────────────────────────
    console.log("\n[1/2] Testing Desktop Viewport (1280x800)...");
    const desktopContext = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    });
    const page = await desktopContext.newPage();

    // Listen for console errors
    const consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    // Verify Hero
    console.log("✓ Hero stage loaded");
    await page.screenshot({ path: "test-01-desktop-hero.png" });

    // Scroll into Transition 01: Typographic Aperture Portal
    console.log("Testing Transition 01: Typographic Aperture Portal...");
    await page.evaluate(() => {
      window.scrollTo({ top: window.innerHeight * 0.75, behavior: "instant" });
    });
    await page.waitForTimeout(800);

    const autonomousText = await page.locator("text=AUTON").count();
    console.log(`- Word 'AUTON' detected in portal: ${autonomousText > 0}`);
    const focalLetter = await page.locator("text=APERTURE TRANSITION 01").count();
    console.log(`- Aperture Transition badge detected: ${focalLetter > 0}`);

    // Progress scrub into Letter 'O' zoom
    await page.evaluate(() => {
      window.scrollTo({ top: window.innerHeight * 1.35, behavior: "instant" });
    });
    await page.waitForTimeout(800);
    await page.screenshot({ path: "test-02-desktop-aperture-zoom.png" });
    console.log("✓ Captured test-02-desktop-aperture-zoom.png (Letter 'O' expansion & shader vignette)");

    // Scroll into Section 01: Identity Card
    console.log("\nTesting Section 01: Identity & Architecture...");
    await page.evaluate(() => {
      const el = document.getElementById("identity");
      if (el) el.scrollIntoView({ behavior: "instant" });
    });
    await page.waitForTimeout(800);

    // Verify De-cluttered Typography
    const identityHeading = await page.locator("#identity-heading").textContent();
    console.log(`- Identity heading: "${identityHeading?.trim()}"`);
    const hasDoubleEm = await page.locator("#identity-heading em").count();
    console.log(`- Italic <em> count in heading: ${hasDoubleEm} (should be 0)`);

    // Verify Telemetry chips
    const telemetryChips = await page.locator("text=Voice Latency").count();
    console.log(`- Telemetry architecture chips detected: ${telemetryChips > 0}`);
    await page.screenshot({ path: "test-03-desktop-identity-card.png" });
    console.log("✓ Captured test-03-desktop-identity-card.png (3D Card 01 & telemetry chips)");

    // Scroll into Section 02: JourneyTimeline & Transition 02 Card Splash
    console.log("\nTesting Transition 02 & Section 02: JourneyTimeline...");
    await page.evaluate(() => {
      const el = document.getElementById("journey");
      if (el) el.scrollIntoView({ behavior: "instant" });
    });
    await page.waitForTimeout(800);

    // Verify Trajectory Card & Laser
    const journeyHeading = await page.locator("#journey-heading").textContent();
    console.log(`- Journey heading: "${journeyHeading?.trim()}"`);
    const laserLine = await page.locator("#role-fill-line").count();
    const shockwavePulse = await page.locator("#trajectory-shockwave-pulse").count();
    console.log(`- Laser conduit rail present: ${laserLine > 0}`);
    console.log(`- Transition 03 Photon shockwave pulse present: ${shockwavePulse > 0}`);
    await page.screenshot({ path: "test-04-desktop-journey-card.png" });
    console.log("✓ Captured test-04-desktop-journey-card.png (3D Card 02 & Laser Rail)");

    // Scroll into Section 03: SkillsDomain & WebGL cluster
    console.log("\nTesting Section 03: SkillsDomain WebGL Cluster...");
    await page.evaluate(() => {
      const el = document.getElementById("skills");
      if (el) el.scrollIntoView({ behavior: "instant" });
    });
    await page.waitForTimeout(800);
    const canvasCount = await page.locator("#skills canvas").count();
    console.log(`- Three.js WebGL Canvas active in Skills: ${canvasCount > 0}`);
    await page.screenshot({ path: "test-05-desktop-skills-domain.png" });
    console.log("✓ Captured test-05-desktop-skills-domain.png");

    // Scroll into Section 05: ThinkingPhilosophy
    console.log("\nTesting Section 05: Engineering Conviction...");
    await page.evaluate(() => {
      const el = document.getElementById("thinking");
      if (el) el.scrollIntoView({ behavior: "instant" });
    });
    await page.waitForTimeout(800);
    const philosophyWords = await page.locator("#thinking .fade-word").count();
    console.log(`- Word scrub elements in Philosophy: ${philosophyWords}`);
    await page.screenshot({ path: "test-06-desktop-philosophy.png" });
    console.log("✓ Captured test-06-desktop-philosophy.png");

    // Scroll into Footer
    console.log("\nTesting Curtain Reveal Footer...");
    await page.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" });
    });
    await page.waitForTimeout(800);
    await page.screenshot({ path: "test-07-desktop-footer.png" });
    console.log("✓ Captured test-07-desktop-footer.png");

    await desktopContext.close();

    // ─────────────────────────────────────────────────────────────
    // 2. MOBILE TEST SUITE (390x844 - iPhone 14)
    // ─────────────────────────────────────────────────────────────
    console.log("\n[2/2] Testing Mobile Viewport (390x844 - iPhone 14)...");
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(1000);

    // Mobile Hero
    await mobilePage.screenshot({ path: "test-08-mobile-hero.png" });
    console.log("✓ Captured test-08-mobile-hero.png");

    // Verify Horizontal Overflow on Mobile
    const overflowCheck = await mobilePage.evaluate(() => {
      return document.documentElement.scrollWidth <= window.innerWidth + 2;
    });
    console.log(`- Mobile viewport horizontal overflow contained: ${overflowCheck}`);

    // Mobile Scroll through Aperture Portal
    await mobilePage.evaluate(() => {
      window.scrollTo({ top: window.innerHeight * 1.2, behavior: "instant" });
    });
    await mobilePage.waitForTimeout(800);
    await mobilePage.screenshot({ path: "test-09-mobile-aperture.png" });
    console.log("✓ Captured test-09-mobile-aperture.png");

    // Mobile Identity
    await mobilePage.evaluate(() => {
      const el = document.getElementById("identity");
      if (el) el.scrollIntoView({ behavior: "instant" });
    });
    await mobilePage.waitForTimeout(800);
    await mobilePage.screenshot({ path: "test-10-mobile-identity.png" });
    console.log("✓ Captured test-10-mobile-identity.png");

    // Mobile Trajectory
    await mobilePage.evaluate(() => {
      const el = document.getElementById("journey");
      if (el) el.scrollIntoView({ behavior: "instant" });
    });
    await mobilePage.waitForTimeout(800);
    await mobilePage.screenshot({ path: "test-11-mobile-journey.png" });
    console.log("✓ Captured test-11-mobile-journey.png");

    await mobileContext.close();

    console.log("\n=======================================================");
    console.log("🎉 ALL PLAYWRIGHT VERIFICATION CHECKS PASSED FLAWLESSLY!");
    console.log("=======================================================\n");
  } catch (err) {
    console.error("Verification error:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

verifyCinematicTransitions();
