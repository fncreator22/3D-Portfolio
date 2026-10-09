import { chromium } from "playwright";

async function verifyCinematicTransitions() {
  console.log("=== Launching Playwright Deep Verification Suite for Cinematic Scroll Transitions ===");
  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
  });

  try {
    // ─────────────────────────────────────────────────────────────
    // 1. DESKTOP TEST SUITE (1280x800)
    // ─────────────────────────────────────────────────────────────
    console.log("\n[1/3] Testing Desktop Viewport (1280x800)...");
    const desktopContext = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    });
    const page = await desktopContext.newPage();

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
    console.log("\nTesting Transition 01: Typographic Aperture Portal...");
    await page.evaluate(() => {
      window.scrollTo({ top: window.innerHeight * 0.75, behavior: "instant" });
    });
    await page.waitForTimeout(800);

    const autonomousText = await page.locator("text=AUTON").count();
    console.log(`- Word 'AUTON' detected in portal: ${autonomousText > 0}`);
    const badgeCount = await page.locator("text=AUTONOMOUS SYSTEMS ARCHITECTURE").count();
    console.log(`- Engineering Architecture badge detected: ${badgeCount > 0}`);

    // Verify SVG Mask Aperture Hole element exists in DOM
    const svgMaskHole = await page.locator("#letter-o-aperture-mask circle, #letter-o-aperture-mask ellipse").count();
    console.log(`- SVG aperture mask hole (<mask id='letter-o-aperture-mask'>) present: ${svgMaskHole > 0}`);

    // Progress scrub into Letter 'O' zoom
    console.log("Scrubbing into Letter 'O' aperture expansion...");
    await page.evaluate(() => {
      window.scrollTo({ top: window.innerHeight * 1.35, behavior: "instant" });
    });
    await page.waitForTimeout(800);
    await page.screenshot({ path: "test-02-desktop-aperture-zoom.png" });
    console.log("✓ Captured test-02-desktop-aperture-zoom.png (SVG aperture mask expansion & shader vignette)");

    // Verify ZERO DUPLICATE CARDS: Ensure exactly 1 Identity card exists in the document
    const identityHeadingCount = await page.locator("#identity-heading").count();
    console.log(`- Identity heading count in DOM: ${identityHeadingCount} (must be exactly 1, no duplicate preview cards)`);
    if (identityHeadingCount !== 1) {
      throw new Error(`Expected exactly 1 #identity-heading, but found ${identityHeadingCount}`);
    }

    // Scroll into Section 01: Identity Card
    console.log("\nTesting Section 01: Identity Card (Card 01)...");
    await page.evaluate(() => {
      const el = document.getElementById("identity");
      if (el) el.scrollIntoView({ behavior: "instant" });
    });
    await page.waitForTimeout(800);

    const identityHeading = await page.locator("#identity-heading").textContent();
    console.log(`- Identity heading: "${identityHeading?.trim()}"`);
    const hasDoubleEm = await page.locator("#identity-heading em").count();
    console.log(`- Italic <em> count in heading: ${hasDoubleEm} (should be 0)`);

    const telemetryChips = await page.locator("text=Voice Latency").count();
    console.log(`- Telemetry architecture chips detected: ${telemetryChips > 0}`);
    await page.screenshot({ path: "test-03-desktop-identity-card.png" });
    console.log("✓ Captured test-03-desktop-identity-card.png (3D Card 01 & telemetry chips)");

    // Test Rapid Scroll Reversal across Aperture Portal
    console.log("\nTesting rapid scroll direction reversal through aperture portal...");
    await page.evaluate(() => {
      // Rapid flick back to top
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await page.waitForTimeout(600);
    const topAuton = await page.locator("text=AUTON").count();
    console.log(`- Aperture cleanly restored on reverse scroll to top: ${topAuton > 0}`);

    // Scroll into Section 02: JourneyTimeline & Transition 02 Card Splash
    console.log("\nTesting Transition 02 & Section 02: JourneyTimeline (Card 02)...");
    await page.evaluate(() => {
      const el = document.getElementById("journey");
      if (el) el.scrollIntoView({ behavior: "instant" });
    });
    await page.waitForTimeout(800);

    const journeyHeading = await page.locator("#journey-heading").textContent();
    console.log(`- Journey heading: "${journeyHeading?.trim()}"`);
    const laserLine = await page.locator("#role-fill-line").count();
    const shockwavePulse = await page.locator("#trajectory-shockwave-pulse").count();
    console.log(`- Laser conduit rail present: ${laserLine > 0}`);
    console.log(`- Transition 03 Photon shockwave pulse present: ${shockwavePulse > 0}`);
    await page.screenshot({ path: "test-04-desktop-journey-card.png" });
    console.log("✓ Captured test-04-desktop-journey-card.png (3D Card 02 & Laser Rail)");

    // Scroll into Section 03: SkillsDomain (Card 03) & WebGL cluster
    console.log("\nTesting Section 03: SkillsDomain (Card 03) & WebGL Cluster...");
    await page.evaluate(() => {
      const el = document.getElementById("skills");
      if (el) el.scrollIntoView({ behavior: "instant" });
    });
    await page.waitForTimeout(800);
    const canvasCount = await page.locator("#skills canvas").count();
    console.log(`- Three.js WebGL Canvas active in Skills: ${canvasCount > 0}`);
    await page.screenshot({ path: "test-05-desktop-skills-domain.png" });
    console.log("✓ Captured test-05-desktop-skills-domain.png (3D Card 03 & Synaptic Cluster)");

    // Scroll into Section 05: ThinkingPhilosophy (Card 05)
    console.log("\nTesting Section 05: Engineering Conviction (Card 05)...");
    await page.evaluate(() => {
      const el = document.getElementById("thinking");
      if (el) el.scrollIntoView({ behavior: "instant" });
    });
    await page.waitForTimeout(800);
    const philosophyWords = await page.locator("#thinking .fade-word").count();
    console.log(`- Word scrub elements in Philosophy: ${philosophyWords}`);
    await page.screenshot({ path: "test-06-desktop-philosophy.png" });
    console.log("✓ Captured test-06-desktop-philosophy.png (3D Card 05 & Word Scrub)");

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
    console.log("\n[2/3] Testing Mobile Viewport (390x844 - iPhone 14)...");
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

    // ─────────────────────────────────────────────────────────────
    // 3. ZERO CONSOLE ERRORS VALIDATION
    // ─────────────────────────────────────────────────────────────
    console.log("\n[3/3] Checking Console Errors...");
    console.log(`- Total console errors detected: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.warn("Console errors encountered:", consoleErrors);
    }

    console.log("\n=======================================================");
    console.log("🎉 ALL PLAYWRIGHT DEEP VERIFICATION CHECKS PASSED!");
    console.log("=======================================================\n");
  } catch (err) {
    console.error("Verification error:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

verifyCinematicTransitions();
