const puppeteer = require('puppeteer');

async function scrapeAnyProduct(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 });

    // استخرج المعلومات باستخدام طرق عامة تناسب معظم المواقع
    const result = await page.evaluate(() => {
      const title =
        document.querySelector('h1')?.innerText ||
        document.querySelector('title')?.innerText ||
        null;

      const description =
        document.querySelector('meta[name="description"]')?.content ||
        document.querySelector('p')?.innerText ||
        null;

      const price =
        document.querySelector('[class*="price"]')?.innerText ||
        document.querySelector('[class*="Price"]')?.innerText ||
        null;

      const images = Array.from(document.querySelectorAll('img'))
        .map(img => img.src)
        .filter(src => src.startsWith('http') && !src.includes('svg'))
        .slice(0, 10); // اختصر الصور لـ10

      return { title, description, price, images };
    });

    await browser.close();
    return result;
  } catch (err) {
    await browser.close();
    return { error: "❌ Failed to scrape product", details: err.message };
  }
}

// للاختبار المحلي
(async () => {
  const testUrl = 'https://www.example.com/product'; // ← ضع أي رابط منتج حقيقي هنا
  const data = await scrapeAnyProduct(testUrl);
  console.log(JSON.stringify(data, null, 2));
})();
