import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import * as auth from '@/utils/auth'
import { useGlobalConfig, useMessage } from '@/hooks'
import { useAppStore, useUserStore } from '@/store'
import { refreshTokenApi } from '@/api/login'

const ignoreMsg = ['无效的刷新令牌', '刷新令牌已过期']

export function createInterceptor(service: AxiosInstance) {
  const globalConfig = useGlobalConfig()
  const message = useMessage()

  service.interceptors.request.use(async (config) => {
    // 设置 Token
    const { noToken = false } = config
    if (!noToken) {
      const accessToken = await auth.getAccessToken()
      if (accessToken) {
        config.headers.set('Authorization', `Bearer ${accessToken}`)
      }
    }

    // 设置 租户id
    if (globalConfig.tenantEnable) {
      const tenantId = await auth.getTenantId()
      if (tenantId) {
        config.headers.set('tenant-id', tenantId)
      }
    }

    // 设置 国际化
    config.headers.set('Accept-Language', useAppStore().locale)
    // 设置 时区
    config.headers.set('Time-Zone', new Intl.DateTimeFormat().resolvedOptions().timeZone)

    return config
  }, error => Promise.reject(error))

  service.interceptors.response.use(async (response) => {
    const { data } = response
    if (!data) {
      throw new Error('Empty Response')
    }

    if (response.request.responseType === 'blob') {
      return data
    }

    const code: number = data?.code || 200
    const msg = data?.msg ?? '系统未知错误，请反馈给管理员'
    if (code === 401 && !ignoreMsg.includes(msg)) {
      return refreshTokenMiddleware(service, response.config)
    } else if (code !== 200) {
      if (!ignoreMsg.includes(msg)) {
        message.error(msg)
      }
      return Promise.reject(msg)
    } else {
      return data
    }
  }, (error) => {
    message.error(error.message)
    return Promise.reject(error)
  })
}

let requestList: any[] = []
let refreshing = false
/**
 * 无感刷新token
 * @param service
 * @param config
 */
async function refreshTokenMiddleware(service: AxiosInstance, config: AxiosRequestConfig) {
  if (!refreshing) {
    const userStore = useUserStore()
    refreshing = true
    if (!await auth.getRefreshToken()) {
      return userStore.loginAgain()
    }

    try {
      const { data: token } = await refreshTokenApi()
      await auth.setToken(token)
      requestList.forEach((cb: any) => {
        cb()
      })
      return service(config)
    } catch (e) {
      return userStore.loginAgain()
    } finally {
      requestList = []
      refreshing = false
    }
  } else {
    return new Promise((resolve) => {
      requestList.push(() => resolve(service(config)))
    })
  }
}
