import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
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