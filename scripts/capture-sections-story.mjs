import { chromium } from 'playwright';

const OUT_DIR = 'C:/Users/sr2ma/.gemini/antigravity/brain/995b211a-fb6e-4c26-8dc4-44f6ca2a7d71/screenshots';

async function capture() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:3005...');
  await page.goto('http://localhost:3005', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. Hero
  console.log('Capturing Hero...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${OUT_DIR}/01_hero.png` });

  // 2. Identity Portal / Identity
  console.log('Capturing Identity...');
  const idPos = await page.evaluate(() => {
    const el = document.querySelector('#identity');
    return el ? el.getBoundingClientRect().top + window.scrollY : 1200;
  });
  await page.evaluate((y) => window.scrollTo(0, y - 50), idPos);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT_DIR}/02_identity.png` });

  // 3. Journey / Trajectory
  console.log('Capturing Journey...');
  const journeyPos = await page.evaluate(() => {
    const el = document.querySelector('#journey');
    return el ? el.getBoundingClientRect().top + window.scrollY : 2500;
  });
  await page.evaluate((y) => window.scrollTo(0, y), journeyPos);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT_DIR}/03_journey.png` });

  // 4. Skills Section
  console.log('Capturing Skills...');
  const skillsPos = await page.evaluate(() => {
    const el = document.querySelector('#skills');
    return el ? el.getBoundingClientRect().top + window.scrollY : 4500;
  });
  await page.evaluate((y) => window.scrollTo(0, y + 400), skillsPos);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT_DIR}/04_skills.png` });

  // 5. Projects Section
  console.log('Capturing Projects...');
  const projectsPos = await page.evaluate(() => {
    const el = document.querySelector('#work');
    return el ? el.getBoundingClientRect().top + window.scrollY : 6500;
  });
  await page.evaluate((y) => window.scrollTo(0, y), projectsPos);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT_DIR}/05_projects.png` });

  // 6. Thinking Philosophy
  console.log('Capturing Thinking Philosophy...');
  const philPos = await page.evaluate(() => {
    const el = document.querySelector('#philosophy');
    return el ? el.getBoundingClientRect().top + window.scrollY : 8500;
  });
  await page.evaluate((y) => window.scrollTo(0, y), philPos);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT_DIR}/06_philosophy.png` });

  // 7. Contact & Lanyard
  console.log('Capturing Contact...');
  const contactPos = await page.evaluate(() => {
    const el = document.querySelector('#contact') || document.querySelector('#invariants');
    return el ? el.getBoundingClientRect().top + window.scrollY : 10000;
  });
  await page.evaluate((y) => window.scrollTo(0, y), contactPos);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT_DIR}/07_contact.png` });

  console.log('All screenshots captured successfully!');
  await browser.close();
}

capture().catch((e) => {
  console.error('Error during capture:', e);
  process.exit(1);
});
