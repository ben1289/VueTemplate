import { createI18n } from 'vue-i18n'
import enUS from './lang/en-US'
import zhCN from './lang/zh-CN'
import { LocaleEnum } from '@/enums'

const appStore = localStorage.getItem('appStore')
const defaultLocale: string = (appStore && JSON.parse(appStore)?.locale) || LocaleEnum.ZH_CN

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: LocaleEnum.EN_US,
  legacy: false,
  messages: {
    [LocaleEnum.EN_US]: enUS,
    [LocaleEnum.ZH_CN]: zhCN,
  },
})

export default i18n
