import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/signup': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      '/me': 'http://localhost:3000',
    }
  }
})
