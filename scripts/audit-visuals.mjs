import { chromium } from 'playwright';

async function runVisualAudit() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  // 1. Desktop 1440x900
  console.log('=== Capturing Desktop Visuals ===');
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto('http://localhost:3005', { waitUntil: 'domcontentloaded' });
  await desktop.waitForTimeout(1500);

  // Aperture Stage
  const idTop = await desktop.evaluate(() => {
    const el = document.querySelector('#identity-portal');
    return el ? el.getBoundingClientRect().top + window.scrollY : 800;
  });
  await desktop.evaluate((y) => window.scrollTo(0, y), idTop);
  await desktop.waitForTimeout(600);
  await desktop.screenshot({ path: 'C:/Users/sr2ma/.gemini/antigravity/brain/3038877f-408c-441c-b4d8-d77f46545f63/audit3_desktop_aperture.png' });

  // Section 01 (Revealed Identity Content)
  await desktop.evaluate((y) => window.scrollTo(0, y + 1600), idTop);
  await desktop.waitForTimeout(800);
  await desktop.screenshot({ path: 'C:/Users/sr2ma/.gemini/antigravity/brain/3038877f-408c-441c-b4d8-d77f46545f63/audit3_desktop_identity_revealed.png' });

  // Section 03 (Skills Entry - Circle)
  const skillsTop = await desktop.evaluate(() => {
    const el = document.querySelector('#skills');
    return el ? el.getBoundingClientRect().top + window.scrollY : 5000;
  });
  await desktop.evaluate((y) => window.scrollTo(0, y), skillsTop);
  await desktop.waitForTimeout(800);
  await desktop.screenshot({ path: 'C:/Users/sr2ma/.gemini/antigravity/brain/3038877f-408c-441c-b4d8-d77f46545f63/audit3_desktop_skills_circle.png' });

  // Skills Mid-Scroll (Rainbow Arc)
  await desktop.evaluate((y) => window.scrollTo(0, y + 1000), skillsTop);
  await desktop.waitForTimeout(800);
  await desktop.screenshot({ path: 'C:/Users/sr2ma/.gemini/antigravity/brain/3038877f-408c-441c-b4d8-d77f46545f63/audit3_desktop_skills_arc.png' });

  // Skills Shuffled
  await desktop.evaluate((y) => window.scrollTo(0, y + 1800), skillsTop);
  await desktop.waitForTimeout(800);
  await desktop.screenshot({ path: 'C:/Users/sr2ma/.gemini/antigravity/brain/3038877f-408c-441c-b4d8-d77f46545f63/audit3_desktop_skills_shuffled.png' });

  // 2. Mobile 390x844
  console.log('=== Capturing Mobile Visuals ===');
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto('http://localhost:3005', { waitUntil: 'domcontentloaded' });
  await mobile.waitForTimeout(1500);

  const mIdTop = await mobile.evaluate(() => {
    const el = document.querySelector('#identity-portal');
    return el ? el.getBoundingClientRect().top + window.scrollY : 800;
  });
  await mobile.evaluate((y) => window.scrollTo(0, y + 1400), mIdTop);
  await mobile.waitForTimeout(800);
  await mobile.screenshot({ path: 'C:/Users/sr2ma/.gemini/antigravity/brain/3038877f-408c-441c-b4d8-d77f46545f63/audit3_mobile_identity_revealed.png' });

  const mSkillsTop = await mobile.evaluate(() => {
    const el = document.querySelector('#skills');
    return el ? el.getBoundingClientRect().top + window.scrollY : 4500;
  });
  await mobile.evaluate((y) => window.scrollTo(0, y), mSkillsTop);
  await mobile.waitForTimeout(800);
  await mobile.screenshot({ path: 'C:/Users/sr2ma/.gemini/antigravity/brain/3038877f-408c-441c-b4d8-d77f46545f63/audit3_mobile_skills_circle.png' });

  await mobile.evaluate((y) => window.scrollTo(0, y + 800), mSkillsTop);
  await mobile.waitForTimeout(800);
  await mobile.screenshot({ path: 'C:/Users/sr2ma/.gemini/antigravity/brain/3038877f-408c-441c-b4d8-d77f46545f63/audit3_mobile_skills_arc.png' });

  await browser.close();
  console.log('ALL AUDIT3 SCREENSHOTS CAPTURED SUCCESSFULLY!');
}

runVisualAudit().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
