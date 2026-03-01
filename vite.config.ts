import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use a relative base so the app works regardless of whether GitHub Pages
// mounts it at / or at /glitch-video-dashboard/.
export default defineConfig({
  plugins: [react()],
  base: '',
});
