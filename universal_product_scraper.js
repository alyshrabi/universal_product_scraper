const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send("❌ Please provide ?url= parameter");
  }

  try {
    const response = await fetch('https://api.brightdata.com/request', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 65b4d8cf09d702e116fc3ec28ef2a3c1208de65f432867546928b088b9dbe76a',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        zone: 'scraping_browser1',
        url: targetUrl,
        format: 'raw'
      })
    });

    const html = await response.text();
    res.send(html);
  } catch (error) {
    console.error('❌ Error fetching:', error);
    res.status(500).send(`❌ Failed to fetch URL: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
