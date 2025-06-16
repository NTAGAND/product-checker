const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public'))); // Serve frontend

app.get('/check-product', async (req, res) => {
  const productUrl = req.query.url;

  if (!productUrl) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  try {
    const apiResponse = await fetch(`http://35.222.94.60/api/product/check?source_url=${encodeURIComponent(productUrl)}`);
    const data = await apiResponse.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from API', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
