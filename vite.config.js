
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build: {
    assetsDir: 'assets', // 静态资源目录
  },
  plugins: [
    vue(),
    AutoImport({resolvers: [ElementPlusResolver()]}),
    Components({resolvers: [ElementPlusResolver(),AntDesignVueResolver({importStyle: false})]}),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
