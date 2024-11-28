import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface SummaryResponse {
  summary: string;
}

export function AiSummaryBot() {
  const [loading, setLoading] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>('');

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const response = await axios.post<SummaryResponse>('http://localhost:5000/generate-summary');
        setSummary(response.data.summary);
      } catch (error) {
        console.error('Error fetching summary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []); // Empty array to call only once when component mounts

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">AI Summary Bot</h2>

      {loading ? (
        <p>Processing...</p>
      ) : (
        <div className="mt-4">
          <h3 className="font-semibold text-gray-900">Generated Summary:</h3>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}
    </div>
  );
}

export default AiSummaryBot;
