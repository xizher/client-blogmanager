import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://wuxizhe.fun/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
    },
  },
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/index.css`;
          },
        }
      ]
    })
  ]
})
