import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
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
    ]
  }
})
