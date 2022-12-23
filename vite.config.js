import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3080
  },
  plugins: [vue()],
  base: './loi-short-url',
})
