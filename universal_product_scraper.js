const fetch = require('node-fetch');

async function getPageContent(link) {
  try {
    const response = await fetch('https://api.brightdata.com/request', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 65b4d8cf09d702e116fc3ec28ef2a3c1208de65f432867546928b088b9dbe76a',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        zone: 'scraping_browser1',
        url: link,
        format: 'json' // هترجعلك صفحة HTML داخل content
      })
    });

    const data = await response.json();
    console.log('✅ Page content:\n', data.content); // هنا تقدر تعمل extract من الـ HTML
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

// 👇 استبدل اللينك هنا بأي رابط تريده
//getPageContent('https://www.amazon.com/dp/B09G3HRP45');
