import { chromium } from 'playwright';

async function runAudit() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  // 1. Desktop 1440x900
  console.log('=== Running Desktop Audit ===');
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto('http://localhost:3005', { waitUntil: 'domcontentloaded' });
  await desktop.waitForTimeout(1500);

  // Aperture Stage
  const idTop = await desktop.evaluate(() => {
    const el = document.querySelector('#identity-portal');
    return el ? el.getBoundingClientRect().top + window.scrollY : 800;
  });

  // Identity Centered (After aperture finishes opening: progress >= 0.50 of aperture pin)
  await desktop.evaluate((y) => window.scrollTo(0, y + 650), idTop);
  await desktop.waitForTimeout(800);
  await desktop.screenshot({ path: 'C:/Users/sr2ma/.gemini/antigravity/brain/3038877f-408c-441c-b4d8-d77f46545f63/audit4_desktop_identity.png' });

  // Skills Section Entry (Circle Constellation)
  const skillsTop = await desktop.evaluate(() => {
    const el = document.querySelector('#skills');
    return el ? el.getBoundingClientRect().top + window.scrollY : 4800;
  });
  await desktop.evaluate((y) => window.scrollTo(0, y), skillsTop);
  await desktop.waitForTimeout(800);
  await desktop.screenshot({ path: 'C:/Users/sr2ma/.gemini/antigravity/brain/3038877f-408c-441c-b4d8-d77f46545f63/audit4_desktop_skills_circle.png' });

  // Skills Arc (Mid-Scroll)
  await desktop.evaluate((y) => window.scrollTo(0, y + 1000), skillsTop);
  await desktop.waitForTimeout(800);
  await desktop.screenshot({ path: 'C:/Users/sr2ma/.gemini/antigravity/brain/3038877f-408c-441c-b4d8-d77f46545f63/audit4_desktop_skills_arc.png' });

  // Skills Shuffled
  await desktop.evaluate((y) => window.scrollTo(0, y + 1800), skillsTop);
  await desktop.waitForTimeout(800);
  await desktop.screenshot({ path: 'C:/Users/sr2ma/.gemini/antigravity/brain/3038877f-408c-441c-b4d8-d77f46545f63/audit4_desktop_skills_shuffled.png' });

  // 2. Mobile 390x844
  console.log('=== Running Mobile Audit ===');
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto('http://localhost:3005', { waitUntil: 'domcontentloaded' });
  await mobile.waitForTimeout(1500);

  const mIdTop = await mobile.evaluate(() => {
    const el = document.querySelector('#identity-portal');
    return el ? el.getBoundingClientRect().top + window.scrollY : 800;
  });

  // Mobile Identity Centered
  await mobile.evaluate((y) => window.scrollTo(0, y + 550), mIdTop);
  await mobile.waitForTimeout(800);
  await mobile.screenshot({ path: 'C:/Users/sr2ma/.gemini/antigravity/brain/3038877f-408c-441c-b4d8-d77f46545f63/audit4_mobile_identity.png' });

  // Mobile Skills Section Entry (Circle)
  const mSkillsTop = await mobile.evaluate(() => {
    const el = document.querySelector('#skills');
    return el ? el.getBoundingClientRect().top + window.scrollY : 4200;
  });
  await mobile.evaluate((y) => window.scrollTo(0, y), mSkillsTop);
  await mobile.waitForTimeout(800);
  await mobile.screenshot({ path: 'C:/Users/sr2ma/.gemini/antigravity/brain/3038877f-408c-441c-b4d8-d77f46545f63/audit4_mobile_skills_circle.png' });

  // Mobile Skills Arc
  await mobile.evaluate((y) => window.scrollTo(0, y + 600), mSkillsTop);
  await mobile.waitForTimeout(800);
  await mobile.screenshot({ path: 'C:/Users/sr2ma/.gemini/antigravity/brain/3038877f-408c-441c-b4d8-d77f46545f63/audit4_mobile_skills_arc.png' });

  // Mobile Skills Shuffled
  await mobile.evaluate((y) => window.scrollTo(0, y + 1100), mSkillsTop);
  await mobile.waitForTimeout(800);
  await mobile.screenshot({ path: 'C:/Users/sr2ma/.gemini/antigravity/brain/3038877f-408c-441c-b4d8-d77f46545f63/audit4_mobile_skills_shuffled.png' });

  await browser.close();
  console.log('ALL AUDIT4 SCREENSHOTS RECORDED SUCCESSFULLY!');
}

runAudit().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
