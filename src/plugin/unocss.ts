import initUnocssRuntime from '@unocss/runtime'
import presetUno from '@unocss/preset-uno'
import presetIcons from '@unocss/preset-icons/browser'

initUnocssRuntime({
  defaults: {
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
  },
})
