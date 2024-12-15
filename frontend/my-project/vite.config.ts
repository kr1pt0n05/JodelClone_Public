import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), // Default main entry (login)
        register: resolve(__dirname, 'public/register.html'),
        post: resolve(__dirname, 'public/posts.html'),
      },
    },
    minify: false,
  },
})
