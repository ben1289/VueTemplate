import { defineStore } from 'pinia'
import aEnUS from '@arco-design/web-vue/es/locale/lang/en-us'
import aZhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
import { LocaleEnum } from '@/enums'

const useAppStore = defineStore('appStore', () => {
  const loading = ref(false)

  /* 菜单 */
  const menuCollapse = ref(false)
  function toggleMenuCollapse() {
    menuCollapse.value = !toValue(menuCollapse)
  }

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
    menuCollapse,
    toggleMenuCollapse,
    locale,
    arcoLocale,
    toggleLocale,
  }
}, { persist: true })

export default useAppStore
