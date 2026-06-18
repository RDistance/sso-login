import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // 开发时前端端口
    port: 5173,
    // 代理 /sso 请求到后端
    proxy: {
      '/sso': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
    },
  },
})