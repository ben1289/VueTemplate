import type { InfoResponse, LoginRequest, LoginResponse } from './types'
import type { ResponseContent } from '@/types'
import service from '@/service'
import { CryptoEnum } from '@/enums'

/**
 * 获取 租户 id
 * @param name
 */
export function getTenantIdApi(name: string): ResponseContent<number> {
  return service({
    url: '/system/tenant/get-id-by-name',
    method: 'GET',
    params: { name },
    noToken: true,
  })
}

/**
 * 登录
 * @param data
 */
export function loginApi(data: LoginRequest): ResponseContent<LoginResponse> {
  return service({
    url: '/system/auth/login',
    method: 'POST',
    data,
    noToken: true,
    encrypt: CryptoEnum.SM4,
    decrypt: CryptoEnum.SM4,
  })
}

/**
 * 登出
 */
export function logoutApi(): ResponseContent {
  return service({
    url: '/system/auth/logout',
    method: 'POST',
  })
}

/**
 * 刷新 token
 * @param refreshToken
 */
export async function refreshTokenApi(refreshToken: string): ResponseContent<LoginResponse> {
  return service({
    url: '/system/auth/refresh-token',
    method: 'POST',
    params: { refreshToken },
  })
}

/**
 * 获取 用户信息 角色信息 菜单信息 权限信息
 */
export async function getInfoApi(): ResponseContent<InfoResponse> {
  return service({
    url: '/system/auth/get-permission-info',
    method: 'GET',
  })
}
