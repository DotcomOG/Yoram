import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
app.use(cors());

app.use(cors());

// Enable CORS for all routes
app.use(cors());

// Use Railway’s assigned PORT or default to 8080
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/town-city-building-ca', async (req, res) => {
  const url = req.query.url;
  try {
    const response = await fetch(url);
    const body = await response.text();
    const titleMatch = body.match(/<title>(.*?)<\/title>/);
    const descriptionMatch = body.match(/<meta name="description" content="(.*?)">/);
    
    const pageContent = {
      url: url,
      title: titleMatch ? titleMatch[1] : 'No Title Found',
      description: descriptionMatch ? descriptionMatch[1] : 'No Description Found',
      userIntent: {
        query: req.query.query || 'What is the content of this page?',
        intent: 'informational',
        context: 'User is trying to understand the content of the provided URL',
      },
      content: body
    };

    res.json(pageContent);
  } catch (error) {
    res.status(500).send('Error retrieving content from the provided URL');
  }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});