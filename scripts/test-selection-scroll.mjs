import { chromium } from 'playwright';

async function testSelection() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3005', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  for (const scrollY of [400, 700, 1000, 1300, 1600, 1900]) {
    await page.evaluate((y) => {
      window.scrollTo(0, y);
      if (window.ScrollTrigger) window.ScrollTrigger.update();
    }, scrollY);
    await page.waitForTimeout(300);

    const heading = page.locator('#identity-heading');
    const isVisible = await heading.isVisible();
    const box = await heading.boundingBox();

    let elAtPoint = null;
    let selected = '';
    if (box && box.y > 0 && box.y < 900) {
      elAtPoint = await page.evaluate((pos) => {
        const el = document.elementFromPoint(pos.x, pos.y);
        return el ? { tagName: el.tagName, id: el.id, className: String(el.className).slice(0, 30) } : null;
      }, { x: box.x + 30, y: box.y + 20 });

      await page.mouse.move(box.x + 10, box.y + 20);
      await page.mouse.down();
      await page.mouse.move(box.x + 250, box.y + 20, { steps: 5 });
      await page.mouse.up();
      selected = await page.evaluate(() => window.getSelection() ? window.getSelection().toString() : '');
    }

    console.log(`scrollY: ${scrollY} | isVisible: ${isVisible} | box.y: ${box ? Math.round(box.y) : 'null'} | elementAtPoint:`, elAtPoint, `| selected: "${selected}"`);
  }

  await browser.close();
}

testSelection().catch(console.error);
