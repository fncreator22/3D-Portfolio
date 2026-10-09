import { chromium } from "playwright";
import fs from "fs";

async function main() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);

  const steps = [];
  for (let y = 0; y <= 2400; y += 150) {
    await page.evaluate((top) => {
      window.scrollTo(0, top);
      if (window.ScrollTrigger) window.ScrollTrigger.update();
    }, y);
    await page.waitForTimeout(60);

    const metrics = await page.evaluate(() => {
      const nav = document.querySelector("header");
      const navBox = nav ? nav.getBoundingClientRect() : null;
      const identityHeading = document.getElementById("identity-heading");
      const idBox = identityHeading ? identityHeading.getBoundingClientRect() : null;
      const idCard = document.querySelector("#identity > div > div");
      const cardComputed = idCard ? window.getComputedStyle(idCard) : null;
      const portal = document.getElementById("identity-portal");
      const portalContent = portal ? portal.querySelector(".relative.z-10.w-full") : null;
      const contentComputed = portalContent ? window.getComputedStyle(portalContent) : null;
      const overlay = portal ? portal.querySelector("div[class*='z-30']") : null;
      const overlayComputed = overlay ? window.getComputedStyle(overlay) : null;

      return {
        y: window.scrollY,
        navBottom: navBox ? Math.round(navBox.bottom) : null,
        headingTop: idBox ? Math.round(idBox.top) : null,
        headingClearance: idBox && navBox ? Math.round(idBox.top - navBox.bottom) : null,
        cardTransform: cardComputed ? cardComputed.transform : null,
        cardFilter: cardComputed ? cardComputed.filter : null,
        cardOpacity: cardComputed ? cardComputed.opacity : null,
        contentTransform: contentComputed ? contentComputed.transform : null,
        contentOpacity: contentComputed ? contentComputed.opacity : null,
        overlayOpacity: overlayComputed ? overlayComputed.opacity : null,
        overlayVisibility: overlayComputed ? overlayComputed.visibility : null,
      };
    });
    steps.push(metrics);
    await page.screenshot({ path: `flow-mobile-${y}.png` });
  }

  console.log(JSON.stringify(steps, null, 2));
  await browser.close();
}

main();
