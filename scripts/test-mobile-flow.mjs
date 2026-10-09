import { chromium } from "playwright";

async function testMobileScrollFlow() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await page.goto("http://localhost:3000");
  await page.waitForTimeout(1000);

  // Smoothly scroll down in 100px steps
  for (let y = 0; y <= 2600; y += 200) {
    await page.evaluate((top) => {
      window.scrollTo(0, top);
      if (window.ScrollTrigger) window.ScrollTrigger.update();
    }, y);
    await page.waitForTimeout(150);

    const data = await page.evaluate(() => {
      const p = document.getElementById("identity-portal");
      const overlay = p ? p.querySelector(".absolute.inset-0.z-30") : null;
      const content = p ? p.querySelector(".relative.z-10.w-full") : null;
      const maskCircle = document.querySelector("#letter-o-aperture-mask circle");
      const idH2 = document.querySelector("#identity-heading");
      const idH2Box = idH2 ? idH2.getBoundingClientRect() : null;

      return {
        scrollY: window.scrollY,
        overlayOpacity: overlay ? window.getComputedStyle(overlay).opacity : null,
        contentOpacity: content ? window.getComputedStyle(content).opacity : null,
        contentScale: content ? window.getComputedStyle(content).transform : null,
        maskRadius: maskCircle ? maskCircle.getAttribute("r") : null,
        idH2Top: idH2Box ? idH2Box.top : null,
        idH2Visible: idH2Box ? (idH2Box.top >= 0 && idH2Box.top < 844) : false,
      };
    });

    console.log(`scrollY: ${y}`, JSON.stringify(data));
    if (y % 400 === 0 || y === 1000 || y === 1800 || y === 2000) {
      await page.screenshot({ path: `flow-mobile-${y}.png` });
    }
  }

  await browser.close();
}

testMobileScrollFlow().catch(console.error);
