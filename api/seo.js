import express from 'express';
import fetch from 'node-fetch'; // Make sure node-fetch is installed

const app = express();
const port = process.env.PORT || 8080;

// Middleware to handle CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins for testing
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// API route for /town-city-building-ca
app.get('/town-city-building-ca', async (req, res) => {
  try {
    const { url } = req.query;

    // Ensure URL is provided
    if (!url) {
      return res.status(400).json({ error: "URL query parameter is required" });
    }

    // Fetch the URL content
    const response = await fetch(url);
    const html = await response.text();

    // Perform any processing you need on the fetched HTML
    res.json({
      url,
      html, // This is where we return the raw HTML for now, you can process it as needed
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});