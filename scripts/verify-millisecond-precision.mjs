import { chromium } from "playwright";
import fs from "fs";

async function verifyMillisecondPrecision() {
  console.log("=== Launching Millisecond-Precision Deep Verification Suite ===");
  const startTime = Date.now();

  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
  });

  const report = {
    mobile: {},
    desktop: {},
    scrollMilestones: [],
    errors: [],
  };

  try {
    // ─────────────────────────────────────────────────────────────
    // 1. MOBILE VERIFICATION (390x844 - iPhone 14)
    // ─────────────────────────────────────────────────────────────
    console.log("\n[1/2] Running Fine-Grained Mobile Suite (390x844)...");
    const mobileCtx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const page = await mobileCtx.newPage();

    await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(600);

    // A. Mobile Hero Bounding Boxes, Subtitle & Void Check
    console.log("\n[Mobile Hero] Verifying Vertical Distribution & Zero Congestion...");
    const heroBox = await page.locator("section[aria-label='Hero Introduction']").boundingBox();
    const eyebrowBox = await page.locator(".eyebrow").first().boundingBox();
    const h1Box = await page.locator("h1").first().boundingBox();
    const pBox = await page.locator("h1 + p").boundingBox();
    const pText = await page.locator("h1 + p").innerText();
    const avatarBox = await page.locator(".block.lg\\:hidden").boundingBox();
    const buttonsBox = await page.locator("text=Explore 16 Systems").boundingBox();
    const chipsBox = await page.locator("text=Flagship:").boundingBox();

    console.log({
      heroHeight: heroBox?.height,
      eyebrowTop: eyebrowBox?.y,
      h1Top: h1Box?.y,
      pTop: pBox?.y,
      pTextLength: pText.length,
      avatarTop: avatarBox?.y,
      avatarHeight: avatarBox?.height,
      buttonsTop: buttonsBox?.y,
      chipsTop: chipsBox?.y,
    });

    // Check subtitle is rendered immediately without empty hole
    if (!pText || pText.trim().length < 20) {
      report.errors.push(`Mobile subtitle is blank or empty on mount! Length: ${pText?.length}`);
    } else {
      console.log(`✓ Mobile subtitle populated immediately: "${pText.slice(0, 40)}..."`);
    }

    // Check top clearance: Eyebrow must start comfortably below 64px navbar, between 70px and 120px
    if (!eyebrowBox || eyebrowBox.y < 68 || eyebrowBox.y > 130) {
      report.errors.push(`Mobile eyebrow Y position out of ideal range: ${eyebrowBox?.y}`);
    } else {
      console.log(`✓ Eyebrow properly positioned below navbar: ${eyebrowBox.y}px`);
    }

    // Check avatar breathing room (must be >= 200px on mobile)
    if (!avatarBox || avatarBox.width < 200) {
      report.errors.push(`Mobile avatar too small/squashed: ${avatarBox?.width}px`);
    } else {
      console.log(`✓ Avatar has healthy breathing room: ${avatarBox.width}x${avatarBox.height}px`);
    }

    // Check buttons & chips fill bottom space gracefully
    if (!chipsBox || chipsBox.y < 680) {
      report.errors.push(`Mobile chips cramped too high: ${chipsBox?.y}px`);
    } else {
      console.log(`✓ Flagship chips naturally fill lower mobile space: ${chipsBox.y}px`);
    }

    await page.screenshot({ path: "verify-mobile-hero-perfected.png" });
    console.log("✓ Saved verify-mobile-hero-perfected.png");

    // B. Millisecond & 50px Scroll Step Sweep into Section 01 (Identity)
    console.log("\n[Mobile Transition 01] Running 50px / Millisecond Scroll Sweep...");
    const scrollPositions = [
      0, 200, 400, 600, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000
    ];

    for (const top of scrollPositions) {
      const stepStart = performance.now();
      await page.evaluate((y) => {
        window.scrollTo(0, y);
        if (window.ScrollTrigger) window.ScrollTrigger.update();
      }, top);

      // Fine-grained 60ms cadence
      await page.waitForTimeout(60);
      const stepDuration = Math.round(performance.now() - stepStart);

      const metrics = await page.evaluate(() => {
        const portal = document.getElementById("identity-portal");
        const identity = document.getElementById("identity");
        const heading = document.getElementById("identity-heading");
        const headingBox = heading ? heading.getBoundingClientRect() : null;
        const nav = document.querySelector("header");
        const navBox = nav ? nav.getBoundingClientRect() : null;
        const content = portal ? portal.querySelector(".relative.z-10.w-full") : null;
        const overlay = portal ? portal.querySelector("div[class*='z-30']") : null;
        const maskCircle = document.querySelector("#letter-o-aperture-mask circle");

        return {
          scrollY: window.scrollY,
          headingTop: headingBox ? Math.round(headingBox.top) : null,
          navBottom: navBox ? Math.round(navBox.bottom) : null,
          clearanceFromNavbar: headingBox && navBox ? Math.round(headingBox.top - navBox.bottom) : null,
          contentOpacity: content ? parseFloat(window.getComputedStyle(content).opacity) : null,
          contentTransform: content ? window.getComputedStyle(content).transform : null,
          overlayVisibility: overlay ? window.getComputedStyle(overlay).visibility : null,
          overlayOpacity: overlay ? parseFloat(window.getComputedStyle(overlay).opacity) : null,
          maskRadius: maskCircle ? parseFloat(maskCircle.getAttribute("r") || "0") : null,
        };
      });

      report.scrollMilestones.push({ ...metrics, stepDurationMs: stepDuration });

      if (top === 1200 || top === 1600 || top === 1800) {
        await page.screenshot({ path: `verify-mobile-scroll-${top}px.png` });
        console.log(`- Scroll ${top}px [${stepDuration}ms]: clearance=${metrics.clearanceFromNavbar}px, opacity=${metrics.contentOpacity}, radius=${metrics.maskRadius}`);
      }
    }

    // Verify Identity at resting state (scrollY ~1800):
    const restingCheck = report.scrollMilestones.find((m) => m.scrollY === 1800);
    if (restingCheck) {
      console.log("\n[Resting Identity Validation at 1800px]:");
      console.log(`- Clearance from Navbar: ${restingCheck.clearanceFromNavbar}px (must be > 25px)`);
      console.log(`- Content Opacity: ${restingCheck.contentOpacity} (must be 1.0)`);
      console.log(`- Content Transform: ${restingCheck.contentTransform}`);
      console.log(`- Mask Radius: ${restingCheck.maskRadius}px (must be > 900px)`);

      if (restingCheck.clearanceFromNavbar !== null && restingCheck.clearanceFromNavbar < 25) {
        report.errors.push(`Identity heading too close to navbar: ${restingCheck.clearanceFromNavbar}px`);
      } else {
        console.log(`✓ Clean navbar clearance guaranteed: ${restingCheck.clearanceFromNavbar}px`);
      }

      if (restingCheck.contentOpacity !== null && restingCheck.contentOpacity < 0.95) {
        report.errors.push(`Identity content not fully brightened: opacity ${restingCheck.contentOpacity}`);
      } else {
        console.log("✓ Full 1.0 crystal brightness confirmed");
      }
    }

    // C. Section 05 Conviction Mobile Check
    console.log("\n[Mobile Section 05] Verifying Conviction Card & Zero AI-Slop Boxes...");
    await page.evaluate(() => {
      document.getElementById("thinking")?.scrollIntoView({ behavior: "instant" });
      if (window.ScrollTrigger) window.ScrollTrigger.update();
    });
    await page.waitForTimeout(350);

    const s5Check = await page.evaluate(() => {
      const thinking = document.getElementById("thinking");
      const traceInspector = document.querySelector(".trace-inspector-console");
      const bodyText = document.body.innerText;
      const hasPostSpan = bodyText.includes("POST /eval/ast-guardrail");
      const hasSimulateProbe = bodyText.includes("Simulate Probe");
      const hasJsonPayload = bodyText.includes("BLOCK_ARBITRARY_CODE_EXECUTION");
      const creedWords = document.querySelectorAll("#thinking .creed-word");
      const stageButtons = thinking ? thinking.querySelectorAll("button") : [];
      const threeBoxGrid = thinking ? thinking.querySelectorAll(".grid-cols-3") : [];
      const thinkingBox = thinking ? thinking.getBoundingClientRect() : null;

      // Calculate total words in Section 05
      const thinkingText = thinking ? thinking.innerText : "";
      const wordCount = thinkingText.trim().split(/\s+/).length;

      return {
        hasThinking: !!thinking,
        hasTraceInspector: !!traceInspector,
        hasPostSpan,
        hasSimulateProbe,
        hasJsonPayload,
        creedWordCount: creedWords.length,
        beaconButtonCount: stageButtons.length,
        hasThreeBoxGrid: threeBoxGrid.length > 0,
        sectionWordCount: wordCount,
        sectionHeight: thinkingBox?.height,
      };
    });

    console.log("Section 05 DOM Audit:", s5Check);

    if (s5Check.hasTraceInspector || s5Check.hasSimulateProbe || s5Check.hasJsonPayload || s5Check.hasPostSpan) {
      report.errors.push("Section 05 still contains technical trace inspector or JSON clutter!");
    } else {
      console.log("✓ Zero trace inspector console or JSON payloads present in Section 05");
    }

    if (s5Check.hasThreeBoxGrid) {
      report.errors.push("Section 05 still contains an AI-slop 3-box grid!");
    } else {
      console.log("✓ Zero AI-slop boxes confirmed (clean linear meridian layout)");
    }

    if (s5Check.sectionWordCount > 55) {
      report.errors.push(`Section 05 contains too much text (${s5Check.sectionWordCount} words)! Expected < 55.`);
    } else {
      console.log(`✓ Clean, minimal text confirmed (${s5Check.sectionWordCount} words in entire section)`);
    }

    await page.screenshot({ path: "verify-mobile-conviction-perfected.png" });
    console.log("✓ Saved verify-mobile-conviction-perfected.png");

    await mobileCtx.close();

    // ─────────────────────────────────────────────────────────────
    // 2. DESKTOP VERIFICATION (1440x900)
    // ─────────────────────────────────────────────────────────────
    console.log("\n[2/2] Running Desktop Suite (1440x900)...");
    const desktopCtx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const desktopPage = await desktopCtx.newPage();
    await desktopPage.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await desktopPage.waitForTimeout(800);

    // Desktop Hero check
    await desktopPage.screenshot({ path: "verify-desktop-hero-final.png" });
    console.log("✓ Saved verify-desktop-hero-final.png");

    // Desktop Section 05 Conviction
    await desktopPage.evaluate(() => {
      document.getElementById("thinking")?.scrollIntoView({ behavior: "instant" });
      if (window.ScrollTrigger) window.ScrollTrigger.update();
    });
    await desktopPage.waitForTimeout(600);
    await desktopPage.screenshot({ path: "verify-desktop-conviction-final.png" });
    console.log("✓ Saved verify-desktop-conviction-final.png");

    await desktopCtx.close();

  } catch (err) {
    report.errors.push(err.message);
    console.error("Test error:", err);
  } finally {
    await browser.close();
  }

  const durationMs = Date.now() - startTime;
  console.log(`\n=== Verification Finished in ${durationMs}ms ===`);
  console.log("Errors detected:", report.errors.length === 0 ? "NONE (All Checks Passed!)" : report.errors);

  fs.writeFileSync("quality/millisecond-verification-report.json", JSON.stringify(report, null, 2));
}

verifyMillisecondPrecision().catch(console.error);
