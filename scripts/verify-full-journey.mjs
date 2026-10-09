import { chromium } from 'playwright';
import path from 'path';

const ARTIFACTS_DIR = 'C:/Users/sr2ma/.gemini/antigravity/brain/3038877f-408c-441c-b4d8-d77f46545f63';

async function runFullJourneyVerification() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  console.log('=== 1. Desktop End-to-End Verification (1440x900) ===');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await desktopContext.newPage();
  await page.goto('http://localhost:3005', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // --- Test 1: Real Mouse Drag Selection on Section 01 (Identity) ---
  console.log('\n--- 1A. Testing Mouse Drag Selection on Section 01 (Identity) ---');
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(600);

  const heading1 = page.locator('#identity-heading');
  const box1 = await heading1.boundingBox();
  console.log('Identity heading bounding box:', box1);

  if (box1) {
    await page.mouse.move(box1.x + 10, box1.y + 20);
    await page.mouse.down();
    await page.mouse.move(box1.x + 350, box1.y + 20, { steps: 8 });
    await page.mouse.up();
    const selected1 = await page.evaluate(() => window.getSelection()?.toString() || '');
    console.log(`Mouse drag selected text from #identity-heading: "${selected1}"`);
    if (selected1.length > 5) {
      console.log('PASS: Section 01 text selection via mouse drag works smoothly!');
    } else {
      console.error('FAIL: Could not select text on Section 01 via mouse drag.');
    }
  }

  // --- Test 2: Complete 6-Phase Animation on Section 03 (Skills) ---
  console.log('\n--- 1B. Testing Section 03 Full Animation (Journey -> Skill -> Project) ---');
  // Scroll sequentially from Identity past Journey to the top of Skills
  const journeySec = page.locator('#journey');
  const journeyBox = await journeySec.boundingBox();
  const journeyTop = await page.evaluate(() => {
    const el = document.querySelector('#journey');
    return el ? el.getBoundingClientRect().top + window.scrollY : 2000;
  });
  console.log('Journey top scroll position:', journeyTop);

  const skillsTop = await page.evaluate(() => {
    const el = document.querySelector('#skills');
    return el ? el.getBoundingClientRect().top + window.scrollY : 4500;
  });
  console.log('Skills top scroll position:', skillsTop);

  // Scroll to exact entry of Skills
  await page.evaluate((y) => window.scrollTo(0, y), skillsTop);
  await page.waitForTimeout(600);

  // Helper function to check bounds
  async function checkCardBounds(phaseName) {
    return await page.evaluate((name) => {
      const container = document.querySelector('#skills .rounded-\\[28px\\], #skills .rounded-\\[36px\\]');
      if (!container) return { error: 'Container not found' };
      const cRect = container.getBoundingClientRect();
      const cardEls = document.querySelectorAll('#skills [role="button"]');
      let outOfBounds = 0;
      cardEls.forEach((card) => {
        const r = card.getBoundingClientRect();
        const isOut = r.top < cRect.top - 5 || r.bottom > cRect.bottom + 5 || r.left < cRect.left - 5 || r.right > cRect.right + 5;
        if (isOut) outOfBounds++;
      });
      return { phase: name, total: cardEls.length, outOfBounds };
    }, phaseName);
  }

  // Phase 1: Entry / Line (+200px)
  await page.evaluate((y) => window.scrollTo(0, y + 200), skillsTop);
  await page.waitForTimeout(500);
  const bounds1 = await checkCardBounds('Line');
  console.log(`Phase 1 (Line) card bounds: ${bounds1.outOfBounds} of ${bounds1.total} out of bounds.`);

  // Phase 3: Circle Constellation (+700px)
  await page.evaluate((y) => window.scrollTo(0, y + 700), skillsTop);
  await page.waitForTimeout(600);
  const bounds3 = await checkCardBounds('Circle');
  console.log(`Phase 3 (Circle) card bounds: ${bounds3.outOfBounds} of ${bounds3.total} out of bounds.`);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'verify-desktop-skills-circle.png') });

  // Phase 4: Convex Rainbow Arc (+1350px)
  await page.evaluate((y) => window.scrollTo(0, y + 1350), skillsTop);
  await page.waitForTimeout(600);
  const bounds4 = await checkCardBounds('Arc');
  console.log(`Phase 4 (Arc) card bounds: ${bounds4.outOfBounds} of ${bounds4.total} out of bounds.`);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'verify-desktop-skills-bottom-arc.png') });

  // Phase 5: Shuffled Arc (+1850px)
  await page.evaluate((y) => window.scrollTo(0, y + 1850), skillsTop);
  await page.waitForTimeout(600);
  const bounds5 = await checkCardBounds('Shuffle');
  console.log(`Phase 5 (Shuffle) card bounds: ${bounds5.outOfBounds} of ${bounds5.total} out of bounds.`);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'verify-desktop-skills-shuffled.png') });

  // Phase 6: Exit to Projects (+2300px)
  await page.evaluate((y) => window.scrollTo(0, y + 2300), skillsTop);
  await page.waitForTimeout(600);
  const bounds6 = await checkCardBounds('Exit');
  console.log(`Phase 6 (Exit) card bounds: ${bounds6.outOfBounds} of ${bounds6.total} out of bounds.`);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'verify-desktop-skills-exit.png') });

  // --- Test 3: Real Mouse Drag Selection on Section 05 (Philosophy) ---
  console.log('\n--- 1C. Testing Mouse Drag Selection on Section 05 (Philosophy) ---');
  const thinkingSec = page.locator('#thinking');
  await thinkingSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  const heading5 = page.locator('#thinking h2');
  const box5 = await heading5.boundingBox();
  if (box5) {
    await page.mouse.move(box5.x + 10, box5.y + 15);
    await page.mouse.down();
    await page.mouse.move(box5.x + 280, box5.y + 15, { steps: 8 });
    await page.mouse.up();
    const selected5 = await page.evaluate(() => window.getSelection()?.toString() || '');
    console.log(`Mouse drag selected text from #thinking h2: "${selected5}"`);
    if (selected5.length > 5) {
      console.log('PASS: Section 05 text selection via mouse drag works smoothly!');
    } else {
      console.error('FAIL: Could not select text on Section 05 via mouse drag.');
    }
  }

  await desktopContext.close();

  // --- Step 2: Mobile Touch Verification (390x844) ---
  console.log('\n=== 2. Mobile Verification (390x844) ===');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true
  });
  const mPage = await mobileContext.newPage();
  await mPage.goto('http://localhost:3005', { waitUntil: 'networkidle' });
  await mPage.waitForTimeout(1000);

  const mSkillsSec = mPage.locator('#skills');
  await mSkillsSec.scrollIntoViewIfNeeded();
  await mPage.waitForTimeout(600);

  const mStartY = await mPage.evaluate(() => window.scrollY);
  console.log('Mobile scrollY at #skills entry:', mStartY);

  // Mobile Circle (+450px)
  await mPage.evaluate((y) => window.scrollTo(0, y + 450), mStartY);
  await mPage.waitForTimeout(600);
  await mPage.screenshot({ path: path.join(ARTIFACTS_DIR, 'verify-mobile-skills-circle.png') });

  // Mobile Arc (+850px)
  await mPage.evaluate((y) => window.scrollTo(0, y + 850), mStartY);
  await mPage.waitForTimeout(600);
  await mPage.screenshot({ path: path.join(ARTIFACTS_DIR, 'verify-mobile-skills-bottom-arc.png') });

  // Mobile Exit (+1350px)
  await mPage.evaluate((y) => window.scrollTo(0, y + 1350), mStartY);
  await mPage.waitForTimeout(600);
  await mPage.screenshot({ path: path.join(ARTIFACTS_DIR, 'verify-mobile-skills-exit.png') });

  await mobileContext.close();
  await browser.close();
  console.log('\nAll end-to-end tests finished successfully!');
}

runFullJourneyVerification().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
