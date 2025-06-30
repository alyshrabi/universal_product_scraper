const fetch = require('node-fetch');

(async () => {
  try {
    const response = await fetch('https://api.brightdata.com/request', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 65b4d8cf09d702e116fc3ec28ef2a3c1208de65f432867546928b088b9dbe76a',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        zone: 'scraping_browser1',
        url: 'https://www.alibaba.com/product-detail/JZ-1110-Wholesale-Wireless-Portable-Mini_1601270405466.html',
        format: 'raw'
      })
    });

    const html = await response.text();
    console.log('📄 HTML content loaded successfully:\n\n');
    console.log(html.slice(0, 1000)); // اطبع أول 1000 حرف فقط للتجربة
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
})();
