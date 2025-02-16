import express from 'express';
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files (if any) in the 'public' directory
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to the AI SEO Backend!');
});

app.get('/analyze', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ message: 'URL is required for analysis.' });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();

    const dom = new JSDOM(html);
    const document = dom.window.document;

    const title = document.querySelector('title')?.textContent || 'No title found';
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || 'No description found';
    const h1 = document.querySelector('h1')?.textContent || 'No H1 found';
    const h2Count = document.querySelectorAll('h2').length;

    res.json({
      title,
      description,
      h1,
      h2Count,
      url,
      message: '✅ SEO analysis completed successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error analyzing the URL.', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
});