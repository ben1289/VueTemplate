import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { sm4 } from 'sm-crypto'
import { AES, enc } from 'crypto-js'
import { CryptoEnum } from '@/enums'
import * as auth from '@/utils/auth'
import { useGlobalConfig, useMessage } from '@/hooks'
import { useAppStore, useUserStore } from '@/store'
import { refreshTokenApi } from '@/api/login'

const ignoreMsg = ['无效的刷新令牌', '刷新令牌已过期']
const globalConfig = useGlobalConfig()

export function createInterceptor(service: AxiosInstance) {
  const message = useMessage()

  /**
   * 请求拦截器
   */
  service.interceptors.request.use(async (config) => {
    // 设置 Token
    const { noToken = false, encrypt, data } = config
    if (!noToken) {
      const accessToken = await auth.getAccessToken()
      if (accessToken) {
        config.headers.set('Authorization', `Bearer ${accessToken}`)
      }
    }

    // 加密
    if (globalConfig.apiCryptoEnable && encrypt) {
      config.data = encryptData(data, encrypt)
      config.headers.set('Content-Type', 'application/json')
      config.transformRequest = d => d
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

  /**
   * 响应拦截器
   */
  service.interceptors.response.use(async (response) => {
    let { data, config } = response
    if (!data) {
      throw new Error('Empty Response')
    }

    if (response.request.responseType === 'blob') {
      if (data instanceof Blob && data.type === 'application/json') {
        const text = await data.text()
        try {
          data = JSON.parse(text)
        } catch (err) {
          return Promise.reject(data)
        }
      } else {
        return data
      }
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
      if (globalConfig.apiCryptoEnable && config.decrypt) {
        data.data = decryptData(data.data, config.decrypt)
      }
      return data
    }
  }, (error) => {
    message.error(error.message)
    return Promise.reject(error)
  })
}

/**
 * 加密 data
 * @param data
 * @param crypto
 */
function encryptData(data: Record<string, any>, crypto: CryptoEnum) {
  if (data) {
    const plaintext = JSON.stringify(data)
    let ciphertext: string
    if (crypto === CryptoEnum.SM4) {
      ciphertext = sm4.encrypt(plaintext, globalConfig.sm4SecretKey)
    } else if (crypto === CryptoEnum.AES) {
      ciphertext = AES.encrypt(plaintext, globalConfig.aesSecretKey).toString()
    } else {
      return data
    }
    return window.btoa(ciphertext)
  }
}

/**
 * 解密 data
 * @param data
 * @param crypto
 */
function decryptData(data: string, crypto: CryptoEnum) {
  if (data) {
    let ciphertext
    try {
      ciphertext = window.atob(data)
    } catch (e) {
      return data
    }
    let plaintext: string
    if (crypto === CryptoEnum.SM4) {
      plaintext = sm4.decrypt(ciphertext, globalConfig.sm4SecretKey)
    } else if (crypto === CryptoEnum.AES) {
      const bytes = AES.decrypt(ciphertext, globalConfig.aesSecretKey)
      plaintext = bytes.toString(enc.Utf8)
    } else {
      return data
    }
    return JSON.parse(plaintext)
  }
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
    const refreshToken = await auth.getRefreshToken()
    if (!refreshToken) {
      return userStore.loginAgain()
    }
    try {
      const { data: token } = await refreshTokenApi(refreshToken)
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
