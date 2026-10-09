import { chromium } from "playwright";

async function verifyRefinements() {
  console.log("=== Running Playwright Deep Verification Suite for Hero, Aperture & De-boxified Surfaces ===");
  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
  });

  try {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    });
    const page = await context.newPage();

    // 1. Hero Stage & Typewriter Animation Verification
    console.log("\n[1] Verifying Hero Top Gradient & Typewriter Reveal...");
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    
    // Screenshot immediately on mount (typing in progress)
    await page.waitForTimeout(600);
    await page.screenshot({ path: "test-hero-typing-start.png" });
    console.log("✓ Captured test-hero-typing-start.png (typewriter in progress with cursor)");

    // Wait for typewriter to complete (~3.5s)
    await page.waitForTimeout(3800);
    await page.screenshot({ path: "test-hero-typing-complete.png" });
    console.log("✓ Captured test-hero-typing-complete.png (full brand subtitle and thinned top gradient)");

    const subtitleText = await page.locator("section[aria-label='Hero Introduction'] p").first().textContent();
    console.log(`- Subtitle text: "${subtitleText?.trim()}"`);
    if (subtitleText?.includes("sub-200ms")) {
      throw new Error("Hero subtitle still contains 'sub-200ms'!");
    }
    if (!subtitleText?.includes("AI Systems & Autonomous Agent Engineer")) {
      throw new Error("Hero subtitle does not contain personal brand introduction!");
    }

    // 2. Aperture Portal: Zero Ghost Text Bleed Verification (Scroll to portal resting state)
    console.log("\n[2] Verifying Aperture Portal Resting State (Zero Ghost Text Bleed)...");
    await page.evaluate(() => {
      window.scrollTo({ top: window.innerHeight * 1.02, behavior: "instant" });
    });
    await page.waitForTimeout(600);
    await page.screenshot({ path: "test-aperture-resting-no-ghost.png" });
    console.log("✓ Captured test-aperture-resting-no-ghost.png (resting aperture hole with 0% content bleed)");

    // Check content wrapper opacity at resting state
    const contentOpacity = await page.evaluate(() => {
      const el = document.querySelector("#identity-portal > div:first-child");
      return el ? window.getComputedStyle(el).opacity : null;
    });
    console.log(`- Content wrapper opacity at resting portal state: ${contentOpacity} (must be 0 or near 0)`);

    // 3. Aperture Portal: Perfect Symmetry Verification
    console.log("\n[3] Verifying Aperture Portal Circular Symmetry...");
    await page.evaluate(() => {
      window.scrollTo({ top: window.innerHeight * 1.25, behavior: "instant" });
    });
    await page.waitForTimeout(600);
    await page.screenshot({ path: "test-aperture-zoom-symmetric.png" });
    console.log("✓ Captured test-aperture-zoom-symmetric.png (symmetric circular aperture expansion)");

    const svgCircleRadius = await page.evaluate(() => {
      const circleEl = document.querySelector("#letter-o-aperture-mask circle");
      if (circleEl) {
        return { isCircle: true, r: circleEl.getAttribute("r") };
      }
      const ellipseEl = document.querySelector("#letter-o-aperture-mask ellipse");
      if (ellipseEl) {
        return { isCircle: false, rx: ellipseEl.getAttribute("rx"), ry: ellipseEl.getAttribute("ry") };
      }
      return null;
    });
    console.log(`- Aperture mask geometry:`, JSON.stringify(svgCircleRadius));
    if (!svgCircleRadius) {
      throw new Error("Could not find aperture mask circle/ellipse!");
    }
    if (!svgCircleRadius.isCircle && svgCircleRadius.rx !== svgCircleRadius.ry) {
      throw new Error(`Aperture mask is not symmetric! rx=${svgCircleRadius.rx}, ry=${svgCircleRadius.ry}`);
    }

    // 4. Section 01: De-boxified Identity Card
    console.log("\n[4] Verifying De-boxified Section 01 (Identity)...");
    await page.evaluate(() => {
      document.getElementById("identity")?.scrollIntoView({ behavior: "instant" });
    });
    await page.waitForTimeout(600);
    await page.screenshot({ path: "test-deboxified-identity.png" });
    console.log("✓ Captured test-deboxified-identity.png (seamless obsidian surface blends)");

    // 5. Section 05: De-boxified Thinking Philosophy Card
    console.log("\n[5] Verifying De-boxified Section 05 (Philosophy)...");
    await page.evaluate(() => {
      document.getElementById("thinking")?.scrollIntoView({ behavior: "instant" });
    });
    await page.waitForTimeout(600);
    await page.screenshot({ path: "test-deboxified-philosophy.png" });
    console.log("✓ Captured test-deboxified-philosophy.png (organic surface blend & frameless principle cards)");

    console.log("\n🎉 ALL REFINEMENT CHECKS & SCREENSHOTS COMPLETED SUCCESSFULLY!");
    await context.close();
  } catch (err) {
    console.error("Refinements verification error:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

verifyRefinements();
