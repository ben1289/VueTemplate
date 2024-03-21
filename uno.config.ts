import { defineConfig, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons/browser'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      collections: {
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
      },
    }),
  ],
})
