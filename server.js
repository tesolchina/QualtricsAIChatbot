require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY) {
  console.error('Missing OPENROUTER_API_KEY in .env');
  process.exit(1);
}

// Enable CORS for GitHub Pages and Qualtrics
app.use(cors({
  origin: [
    'https://tesolchina.github.io',
    'https://hkbuchtl.qualtrics.com',
    'http://localhost:8000',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Simple health
app.get('/health', (req, res) => res.json({status: 'ok'}));

// Proxy chat completion requests
app.post('/api/chat', async (req, res) => {
  try {
    const { model, messages, temperature, max_tokens } = req.body;
    const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ model, messages, temperature, max_tokens })
    });

    const data = await resp.json();
    res.status(resp.status).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'proxy_error', message: err.message });
  }
});

// Serve snippet and static files (optional)
app.use(express.static(path.join(__dirname, '/')));

app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));
