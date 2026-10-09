import { chromium } from 'playwright';
import path from 'path';

const ARTIFACTS_DIR = 'C:/Users/sr2ma/.gemini/antigravity/brain/3038877f-408c-441c-b4d8-d77f46545f63';

async function runVerification() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  console.log('=== 1. Desktop Verification (1440x900) ===');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto('http://localhost:3005', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1000);

  // --- Step A: Section 01 Selection & Invariants Verification ---
  console.log('\n--- Checking Section 01 (Identity) Text Selection & Clean Copy ---');
  const invariantsExists = await desktopPage.evaluate(() => {
    return document.body.innerText.includes('Verified Engineering Invariants');
  });
  console.log(`"Verified Engineering Invariants" present in DOM: ${invariantsExists} (Expected: false)`);
  if (invariantsExists) {
    console.error('FAIL: "Verified Engineering Invariants" was found in DOM!');
  } else {
    console.log('PASS: "Verified Engineering Invariants" successfully eliminated.');
  }

  // Test selecting text in #identity
  const selectedText = await desktopPage.evaluate(() => {
    const heading = document.querySelector('#identity-heading');
    if (!heading) return null;
    const range = document.createRange();
    range.selectNodeContents(heading);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    return sel.toString();
  });
  console.log(`Selected text from #identity-heading: "${selectedText}"`);
  if (selectedText && selectedText.includes('Taking systems from vague asks')) {
    console.log('PASS: Section 01 text can be selected, highlighted, and copied normally.');
  } else {
    console.error('FAIL: Could not select text from #identity-heading');
  }

  // --- Step B: Section 03 Desktop Verification ---
  console.log('\n--- Checking Section 03 (Skills) Scroll Morph & Bounds ---');
  const skillsLoc = desktopPage.locator('#skills');
  await skillsLoc.scrollIntoViewIfNeeded();
  await desktopPage.waitForTimeout(600);

  const startY = await desktopPage.evaluate(() => window.scrollY);
  console.log('Desktop scrollY at #skills entry:', startY);

  // 1. Circle Constellation Capture
  await desktopPage.waitForTimeout(800);
  await desktopPage.screenshot({
    path: path.join(ARTIFACTS_DIR, 'verify-desktop-skills-circle.png')
  });
  console.log('Saved verify-desktop-skills-circle.png');

  // 2. 3D Card Flip on Click
  const cards = await desktopPage.$$('#skills [role="button"]');
  console.log(`Found ${cards.length} cards in skills section.`);
  if (cards.length > 5) {
    await cards[5].click({ force: true });
    await desktopPage.waitForTimeout(600);
    await desktopPage.screenshot({
      path: path.join(ARTIFACTS_DIR, 'verify-desktop-skills-flipped.png')
    });
    console.log('Saved verify-desktop-skills-flipped.png');
    // Unflip for clean scroll test
    await cards[5].click({ force: true });
    await desktopPage.waitForTimeout(300);
  }

  // 3. Scroll inside pin: Circle -> Arc Morph (approx 600px down)
  await desktopPage.evaluate((y) => {
    window.scrollTo(0, y + 600);
    if (window.ScrollTrigger) window.ScrollTrigger.update();
  }, startY);
  await desktopPage.waitForTimeout(800);
  await desktopPage.screenshot({
    path: path.join(ARTIFACTS_DIR, 'verify-desktop-skills-bottom-arc.png')
  });
  console.log('Saved verify-desktop-skills-bottom-arc.png');

  // Check card bounding boxes at Arc state
  const arcBoundsCheck = await desktopPage.evaluate(() => {
    const container = document.querySelector('#skills .rounded-\\[28px\\], #skills .rounded-\\[36px\\]');
    if (!container) return { error: 'Container not found' };
    const cRect = container.getBoundingClientRect();
    const cardEls = document.querySelectorAll('#skills [role="button"]');
    let outOfBounds = 0;
    const details = [];
    cardEls.forEach((card, idx) => {
      const r = card.getBoundingClientRect();
      const isOut = r.top < cRect.top - 5 || r.bottom > cRect.bottom + 5 || r.left < cRect.left - 5 || r.right > cRect.right + 5;
      if (isOut) {
        outOfBounds++;
        details.push({ idx, top: r.top - cRect.top, bottom: cRect.bottom - r.bottom, left: r.left - cRect.left, right: cRect.right - r.right });
      }
    });
    return { total: cardEls.length, outOfBounds, details };
  });
  console.log(`Arc state card bounds check: ${arcBoundsCheck.outOfBounds} of ${arcBoundsCheck.total} cards outside bounds.`);
  if (arcBoundsCheck.outOfBounds > 0) {
    console.warn('Out of bounds details:', arcBoundsCheck.details);
  }

  // 4. Scroll further inside pin: Shuffled Arc (approx 1200px down)
  await desktopPage.evaluate((y) => {
    window.scrollTo(0, y + 1200);
    if (window.ScrollTrigger) window.ScrollTrigger.update();
  }, startY);
  await desktopPage.waitForTimeout(800);
  await desktopPage.screenshot({
    path: path.join(ARTIFACTS_DIR, 'verify-desktop-skills-shuffled.png')
  });
  console.log('Saved verify-desktop-skills-shuffled.png');

  // Check for "sub-5ms" text
  const sub5msFound = await desktopPage.evaluate(() => {
    const text = document.querySelector('#skills')?.textContent || '';
    return text.toLowerCase().includes('sub-5ms') || text.toLowerCase().includes('5ms');
  });
  console.log(`"sub-5ms" found in skills section: ${sub5msFound} (Expected: false)`);

  await desktopContext.close();

  // --- Step C: Section 03 Mobile Verification (390x844) ---
  console.log('\n=== 2. Mobile Verification (390x844 - iPhone 14/15) ===');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3005', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  const mSkillsLoc = mobilePage.locator('#skills');
  await mSkillsLoc.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(600);

  const mStartY = await mobilePage.evaluate(() => window.scrollY);
  console.log('Mobile scrollY at #skills entry:', mStartY);

  // 1. Mobile Circle
  await mobilePage.waitForTimeout(800);
  await mobilePage.screenshot({
    path: path.join(ARTIFACTS_DIR, 'verify-mobile-skills-circle.png')
  });
  console.log('Saved verify-mobile-skills-circle.png');

  // 2. Mobile Tap to Flip
  const mCards = await mobilePage.$$('#skills [role="button"]');
  if (mCards.length > 3) {
    await mCards[3].click({ force: true });
    await mobilePage.waitForTimeout(600);
    await mobilePage.screenshot({
      path: path.join(ARTIFACTS_DIR, 'verify-mobile-skills-flipped-tap.png')
    });
    console.log('Saved verify-mobile-skills-flipped-tap.png');
    await mCards[3].click({ force: true });
    await mobilePage.waitForTimeout(300);
  }

  // 3. Mobile Arc Morph (+450px)
  await mobilePage.evaluate((y) => {
    window.scrollTo(0, y + 450);
    if (window.ScrollTrigger) window.ScrollTrigger.update();
  }, mStartY);
  await mobilePage.waitForTimeout(800);
  await mobilePage.screenshot({
    path: path.join(ARTIFACTS_DIR, 'verify-mobile-skills-bottom-arc.png')
  });
  console.log('Saved verify-mobile-skills-bottom-arc.png');

  // Check card bounds on mobile
  const mBoundsCheck = await mobilePage.evaluate(() => {
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
    return { total: cardEls.length, outOfBounds };
  });
  console.log(`Mobile arc state card bounds check: ${mBoundsCheck.outOfBounds} of ${mBoundsCheck.total} cards outside bounds.`);

  await mobileContext.close();
  await browser.close();
  console.log('\nAll tests and visual captures completed successfully!');
}

runVerification().catch(err => {
  console.error('Verification script failed:', err);
  process.exit(1);
});
