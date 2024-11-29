require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/generate-summary', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 100,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    const summary = response.data.choices[0].text.trim();
    res.json({ summary });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
});

const PORT = 5177;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
