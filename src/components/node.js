require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { Storage } = require('@google-cloud/storage'); // Google Cloud Storage SDK
const app = express();
const port = 5000;

app.use(express.json());

// Initialize Google Cloud Storage
const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Path to your GCP key file
  projectId: process.env.GOOGLE_CLOUD_PROJECT, // Your GCP project ID
});

app.post('/generate-summary', async (req, res) => {
  const { bucketName, videoFileName } = req.body;

  try {
    // Step 1: Get video metadata or content from Google Cloud
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(videoFileName);

    const [metadata] = await file.getMetadata(); // Example: Retrieve metadata
    const videoDescription = metadata.description || `Video file ${videoFileName} in ${bucketName}`;

    // Step 2: Summarize the video description using OpenAI API
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: `Summarize the following video: ${videoDescription}`,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({ summary: openaiResponse.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing video or generating summary' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
