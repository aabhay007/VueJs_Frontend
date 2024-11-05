import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({  }) => {
 
  return {
    server: {
      host: '0.0.0.0',
      port: 3000,
    },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
    
  },
}});