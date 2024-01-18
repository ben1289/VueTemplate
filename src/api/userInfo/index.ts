import type { GenericAbortSignal } from 'axios'
import type { ResponseContent } from '@/types'
import service from '@/service'

/**
 * 获取当前用户信息
 */
export function getUserInfoApi(): ResponseContent {
  return service({
    url: '/system/user/profile/get',
    method: 'GET',
  })
}

/**
 * 修改当前用户头像
 * @param data
 * @param signal
 */
export function uploadAvatarApi(data: FormData, signal?: GenericAbortSignal): ResponseContent {
  return service({
    url: '/system/user/profile/update-avatar',
    method: 'PUT',
    data,
    signal,
  })
}

/**
 * 修改当前用户信息
 * @param data
 */
export function updateUserInfoApi(data: any): ResponseContent {
  return service({
    url: '/system/user/profile/update',
    method: 'PUT',
    data,
  })
}

/**
 * 修改当前用户密码
 * @param data
 */
export function updateUserPwdApi(data: any): ResponseContent {
  return service({
    url: '/system/user/profile/update-password',
    method: 'PUT',
    data,
  })
}
