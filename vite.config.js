import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: 'app',
        replacement: fileURLToPath(new URL('./src/app', import.meta.url)) 
      },
      {
        find: 'services',
        replacement: fileURLToPath(new URL('./src/services', import.meta.url)) 
      },
      {
        find: 'utils',
        replacement: fileURLToPath(new URL('./src/services/utils', import.meta.url)) 
      },
      {
        find: 'hooks',
        replacement: fileURLToPath(new URL('./src/hooks', import.meta.url)) 
      },
    ]
  }
})