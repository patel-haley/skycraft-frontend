import React, { useState } from 'react';
import axios from 'axios';

export function AiSummaryBot() {
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  console.log('Loaded API Key:', apiKey); // Ensure it's being read

  const fetchSummaryFromVideo = async () => {
    setLoading(true);

    try {
      // Fetch the video from the public folder
      const videoFile = await fetch('/video.mp4').then((res) => res.blob());
      const formData = new FormData();
      formData.append('video', videoFile, 'video.mp4');

      // Make a POST request with the video
      const response = await axios.post(
        'http://localhost:5177', // Replace with your backend URL
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`, // Pass API key if needed
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error processing video:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">AI Summary Bot</h2>

      {loading ? (
        <p>Processing...</p>
      ) : (
        <p>{summary || 'No summary yet.'}</p>
      )}

      <button
        onClick={fetchSummaryFromVideo}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Generate Summary
      </button>
    </div>
  );
}

export default AiSummaryBot;

