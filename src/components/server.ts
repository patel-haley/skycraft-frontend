import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Initialize Express app
const app = express();
const port = 5000;

// Define the directory to store uploaded files
const uploadDir = path.join(__dirname, 'uploads');

// Create the 'uploads' folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);  // Store the uploaded file in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);  // Keep the original file name
  }
});

// Define file size limit and filter allowed file types
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,  // Limit file size to 10 MB
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ['video/mp4', 'image/jpeg', 'image/png'];  // Example: Only allow mp4, jpeg, and png files
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only mp4, jpeg, and png are allowed.'));
    }
    cb(null, true);
  }
});

// Define the POST route to handle file uploads
app.post('/upload', upload.single('file'), (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).send('No file uploaded');
    return;  // Ensure we stop further execution if file is not uploaded
  }

  // Log and send a response with the file info
  console.log('File uploaded successfully:', req.file);
  res.send('File uploaded successfully');
});

// Error handling middleware for multer-specific errors
app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred
    res.status(400).send(`Multer error: ${err.message}`);
  } else if (err) {
    // Some other error occurred
    res.status(500).send(`Server error: ${err.message}`);
  } else {
    next();  // If no error, pass to the next handler
  }
});

// Start the server on port 5000
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
