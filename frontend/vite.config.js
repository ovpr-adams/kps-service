import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/kps-service/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})

