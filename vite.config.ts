import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from a specific file
dotenv.config({ path: path.resolve(__dirname, './src/components/apikey.env') });

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    'process.env': process.env, // Ensure env variables are available in the app
  },
});

