import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const inDocker = process.env.DOCKER === '1'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    open: !inDocker,
    watch: inDocker ? { usePolling: true } : undefined,
  }
})
