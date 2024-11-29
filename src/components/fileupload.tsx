import React, { useState } from 'react';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'video/mp4') {
      setFile(selectedFile);
      setMessage('');
    } else {
      setMessage('Please select a valid MP4 file.');
    }
  };

  const handleUpload = async () => {
      if (!file) {
        setMessage('No file selected!');
        return;
      }
    
      const formData = new FormData();
      formData.append('file', file);
    
      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });
    
        if (response.ok) {
          setMessage('File uploaded successfully!');
        } else {
          setMessage('Failed to upload the file.');
        }
      } catch (error) {
        setMessage('Error uploading the file.');
        console.error(error);
      }
    };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Upload MP4 File</h2>
      <input type="file" accept="video/mp4" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
borderRadius: '5px',

          border: 'none',
          cursor: 'pointer',
        }}
      >
        Upload
      </button>
      {message && <p style={{ marginTop: '10px', color: message.includes('successfully') ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
};



export default FileUpload;