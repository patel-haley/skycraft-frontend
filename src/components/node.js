require('dotenv').config(); 
const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

app.use(express.json());

app.post('/generate-summary', async (req, res) => {
  const { videoDescription } = req.body; 

  if (!videoDescription) {
    return res.status(400).json({ error: 'No video description provided' });
  }

  try {
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/completions', 
      {
        model: 'text-davinci-003', 
        prompt: `Summarize the following video description: ${videoDescription}`,
        max_tokens: 150, 
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use API key from environment variables
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({ summary: openaiResponse.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating summary with GPT' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
