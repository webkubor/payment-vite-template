import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';


// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'development' ? '/' : './',
  resolve: {
    alias: [{
      find: '@',
      replacement: path.resolve(__dirname, 'src')
    }]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    cors: true,
    host: true
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    chunkSizeWarningLimit: 1500
  }
})
