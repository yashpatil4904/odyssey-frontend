import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    commonjsOptions: {
      include: [],
    },
    rollupOptions: {
      external: ['@splinetool/runtime'],
      output: {
        manualChunks: undefined
      }
    }
  },
  optimizeDeps: {
    exclude: ['@splinetool/runtime']
  },
  server: {
    fs: {
      strict: true
    }
  }
});