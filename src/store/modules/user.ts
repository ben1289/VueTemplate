import type { MenuData } from '@/types'
import { defineStore } from 'pinia'
import router from '@/router'
import i18n from '@/locale'
import { MenuTypeEnum, PasswordStateEnum } from '@/enums'
import { setTenantId, setToken } from '@/utils/auth'
import { arrayToTree } from '@/utils/dataHandler'
import { useMessage, useStorage } from '@/hooks'
import { useAppStore, useDictStore, useRouteStore, useTabRouteStore } from '@/store'
import { getInfoApi, getTenantIdApi, loginApi, logoutApi } from '@/api/login'

interface UserInfo {
  id: number
  nickname: string
  avatar: string
}

const STORE_ID = 'userStore'

const useUserStore = defineStore(STORE_ID, () => {
  const isSet = ref(false)
  const userInfo = ref<UserInfo>()
  const roles = ref<string[]>([])
  const menus = ref<MenuData[]>([])
  const permissions = ref<string[]>([])
  const passwordState = ref<PasswordStateEnum>(PasswordStateEnum.NORMAL)
  const passwordExpirationDays = ref<number>()

  async function setInfo() {
    const { data } = await getInfoApi()
    userInfo.value = data.user as UserInfo
    roles.value = data.roles
    menus.value = arrayToTree(data.menus.filter(menu => menu.type !== MenuTypeEnum.BUTTON))
    permissions.value = data.permissions
    isSet.value = true
  }

  async function reset() {
    isSet.value = false
    userInfo.value = undefined
    roles.value = []
    menus.value = []
    permissions.value = []
    passwordState.value = PasswordStateEnum.NORMAL
    passwordExpirationDays.value = undefined
    await nextTick()
  }

  function clearStorage() {
    localStorage.removeItem(STORE_ID)
  }

  /**
   * 登录
   * @param platform
   * @param loginParams
   */
  async function login(platform: string, loginParams: Parameters<typeof loginApi>[0]) {
    const { data: tenantId } = await getTenantIdApi(platform)
    await setTenantId(tenantId)

    const { data: loginRes } = await loginApi(loginParams)
    await setToken(loginRes)
    passwordState.value = loginRes.passwordState
    passwordExpirationDays.value = loginRes.passwordExpirationDays
  }

  /**
   * 重新登录
   */
  function loginAgain() {
    // @ts-ignore Type instantiation is excessively deep and possibly infinite.
    const { t } = i18n.global
    const message = useMessage()
    message.warningAlert(t('app.loginTimeout'), false, {
      okText: t('app.loginAgain'),
      onOk: async () => {
        await clearCache()
        await router.push({ name: 'login' })
      },
    })
  }

  /**
   * 退出
   */
  async function logout() {
    const appStore = useAppStore()
    appStore.loading = true
    try {
      await logoutApi()
      await clearCache()
      await router.push({ name: 'login' })
    } finally {
      appStore.loading = false
    }
  }

  /**
   * 清除缓存
   */
  async function clearCache() {
    const storage = useStorage()
    const dictStore = useDictStore()
    const routeStore = useRouteStore()
    const tabRouteStore = useTabRouteStore()
    await Promise.all([
      storage.clearAuthStorage(),
      reset(),
      dictStore.reset(),
      routeStore.reset(),
      tabRouteStore.reset(),
    ])
    clearStorage()
    dictStore.clearStorage()
  }

  return {
    isSet,
    userInfo,
    roles,
    menus,
    permissions,
    passwordState,
    passwordExpirationDays,
    setInfo,
    reset,
    clearStorage,
    login,
    loginAgain,
    logout,
  }
}, { persist: true })

export default useUserStore
