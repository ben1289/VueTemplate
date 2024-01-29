import type { MenuData } from '@/types'
import { defineStore } from 'pinia'
import { getInfoApi, getTenantIdApi, loginApi, logoutApi } from '@/api/login'
import { useMessage, useStorage } from '@/hooks'
import { setTenantId, setToken } from '@/utils/auth'
import { useAppStore, useDictStore } from '@/store'
import router from '@/router'
import i18n from '@/locale'

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

  async function setInfo() {
    const { data } = await getInfoApi()
    userInfo.value = data.user as UserInfo
    roles.value = data.roles
    menus.value = data.menus
    permissions.value = data.permissions
    isSet.value = true
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

    const { data: token } = await loginApi(loginParams)
    await setToken(token)
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
      await router.push('/login')
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
    await storage.clearAuthStorage()
    clearStorage()
    dictStore.clearStorage()
  }

  return { isSet, userInfo, roles, menus, permissions, setInfo, clearStorage, login, loginAgain, logout }
}, { persist: true })

export default useUserStore
