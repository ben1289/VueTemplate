import { AuthEnum } from '@/enums'
import { useStorage } from '@/hooks'

const { authStorage } = useStorage()

/**
 * 获取 访问 token
 */
export function getAccessToken() {
  return authStorage.getItem<string>(AuthEnum.ACCESS_TOKEN)
}

/**
 * 获取 刷新 token
 */
export function getRefreshToken() {
  return authStorage.getItem<string>(AuthEnum.REFRESH_TOKEN)
}

interface Token {
  accessToken: string
  refreshToken: string
}
/**
 * 设置 token
 * @param token
 */
export function setToken(token: Token) {
  return Promise.all([
    authStorage.setItem(AuthEnum.ACCESS_TOKEN, token.accessToken),
    authStorage.setItem(AuthEnum.REFRESH_TOKEN, token.refreshToken),
  ])
}

/**
 * 获取 租户 id
 */
export function getTenantId() {
  return authStorage.getItem<number>(AuthEnum.TENANT_ID)
}

/**
 * 设置 租户 id
 * @param tenantId
 */
export function setTenantId(tenantId: number) {
  return authStorage.setItem(AuthEnum.TENANT_ID, tenantId)
}
