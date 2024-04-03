import { defineStore } from 'pinia'
import aEnUS from '@arco-design/web-vue/es/locale/lang/en-us'
import aZhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
import { LocaleEnum } from '@/enums'

const useAppStore = defineStore('appStore', () => {
  // 页面加载状态
  const loading = ref(false)
  // 整页
  const fullPage = ref(false)

  // 布局 mode: [Classic, TopMix]
  const layout = reactive({ mode: 'TopMix' })
  // 头部
  const header = reactive({ height: 60 })
  // 侧边栏
  const sider = reactive({ width: 200, collapsedWidth: 48 })
  // tab栏
  const tabBar = reactive({ visible: true, height: 30 })
  // 页面内容 animateMode: [fade-slide]
  const content = reactive({ animate: true, animateMode: 'fade-slide' })
  // 页脚
  const footer = reactive({ visible: true, height: 40 })

  /* 国际化 */
  const locale = ref<LocaleEnum>(LocaleEnum.ZH_CN)
  const arcoLocale = computed(() => {
    if (toValue(locale) === LocaleEnum.EN_US) {
      return aEnUS
    } else {
      return aZhCN
    }
  })

  function toggleLocale(toLocale: LocaleEnum) {
    if (toValue(locale) !== toLocale) {
      locale.value = toLocale

      // 重新加载 翻译接口数据
      window.location.reload()
    }
  }

  return {
    loading,
    fullPage,
    layout,
    header,
    sider,
    tabBar,
    content,
    footer,
    locale,
    arcoLocale,
    toggleLocale,
  }
}, {
  persist: {
    paths: ['layout', 'header', 'sider', 'tabBar', 'content', 'footer', 'locale'],
  },
})

export default useAppStore
