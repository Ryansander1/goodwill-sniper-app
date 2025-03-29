// sniper.js
// Snipe ShopGoodwill items at the last 5 seconds

const puppeteer = require("puppeteer");

async function snipe({ username, password, itemId, maxBid }) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Login
    await page.goto("https://shopgoodwill.com");
    await page.click("#login-link");
    await page.type("#UserName", username);
    await page.type("#Password", password);
    await page.click("#btn-login");
    await page.waitForTimeout(3000);

    // Navigate to item
    await page.goto(`https://www.shopgoodwill.com/Item/${itemId}`);
    await page.waitForTimeout(3000);

    // Countdown
    const getTimeLeft = async () => {
      const timeText = await page.$eval(".time-left", el => el.textContent.trim());
      const [hh, mm, ss] = timeText.split(":").map(Number);
      return hh * 3600 + mm * 60 + ss;
    };

    let secondsLeft = await getTimeLeft();
    while (secondsLeft > 5) {
      console.log(`Time left: ${secondsLeft}s`);
      await page.waitForTimeout(1000);
      secondsLeft = await getTimeLeft();
    }

    // Place bid
    await page.type("#BidAmount", String(maxBid));
    await page.keyboard.press("Enter");
    await page.waitForTimeout(3000);
    console.log(`Bid of $${maxBid} placed for item ${itemId}`);

  } catch (error) {
    console.error("Snipe failed:", error);
  } finally {
    await browser.close();
  }
}

module.exports = { snipe };
