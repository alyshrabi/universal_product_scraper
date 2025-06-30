(async () => {
  try {
    const response = await fetch('api.brightdata.com/request', {
      method: 'POST',
      headers: {
          'Authorization': 'Bearer 65b4d8cf09d702e116fc3ec28ef2a3c1208de65f432867546928b088b9dbe76a',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          zone: 'scraping_browser1',
          url: 'https://geo.brdtest.com/welcome.txt?product=unlocker&method=api',
          format: 'json'
      })
    });
    const data = await response.json();
    console.log('📊 Response data:', data);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
})();
