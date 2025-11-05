import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'styled-components'],
    exclude: ['@figma-react/layout']
  },
  resolve: {
    dedupe: ['react', 'react-dom']
  }
})
