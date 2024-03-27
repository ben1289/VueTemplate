import { mergeConfig } from 'vite'
import baseConfig from './vite.config.base'

export default mergeConfig(
  {
    mode: 'production',
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n', 'pinia-plugin-persistedstate'],
            arco: ['@arco-design/web-vue'],
            iconify: ['@iconify/utils', '@iconify-json/mdi'],
          },
        },
      },
    },
  },
  baseConfig,
)
