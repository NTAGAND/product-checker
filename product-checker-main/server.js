const express = require('express');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

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