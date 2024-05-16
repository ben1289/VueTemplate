import { defineConfig, mergeConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import baseConfig from './vite.config.base'

export default mergeConfig(
  baseConfig,
  defineConfig({
    mode: 'development',
    server: {
      open: true,
    },
    plugins: [
      VueDevTools(),
    ],
  }),
)
