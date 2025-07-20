import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { //local development server configuration
    proxy: {
      '/api': {
        target: 'https://emospace.bccdev.id',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
