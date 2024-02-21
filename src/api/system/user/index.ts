import type { ResponseContent } from '@/types'
import service from '@/service'

/**
 * 获取用户列表
 * @param data
 */
export function getUserList(data: any): ResponseContent {
  return service({
    url: '/system/user/list',
    method: 'POST',
    data,
  })
}

/**
 * 获取用户详情
 * @param id
 */
export function getUserDetail(id: number): ResponseContent {
  return service({
    url: '/system/user/detail',
    method: 'GET',
    params: { id },
  })
}

/**
 * 保存用户
 * @param data
 */
export function saveUser(data: any): ResponseContent {
  return service({
    url: '/system/user/save',
    method: 'POST',
    data,
  })
}

/**
 * 删除用户
 * @param id
 */
export function deleteUser(id: number): ResponseContent {
  return service({
    url: '/system/user/delete',
    method: 'GET',
    params: { id },
  })
}

/**
 * 导出用户
 */
export function exportUser(): Promise<Blob> {
  return service({
    url: '/system/user/export',
    method: 'GET',
    responseType: 'blob',
  })
}

/**
 * 重置用户密码
 * @param data
 */
export function resetUserPwd(data: any): ResponseContent {
  return service({
    url: '/system/user/reset-pwd',
    method: 'PUT',
    data,
  })
}
