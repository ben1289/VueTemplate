import type { ResponseContent } from '@/types'
import service from '@/service'

/**
 * 获取登录日志列表
 * @param data
 */
export function getLoginLogList(data: any): ResponseContent {
  return service({
    url: '/system/login-log/page',
    method: 'POST',
    data,
  })
}

/**
 * 导出登录日志
 */
export function exportLoginLog(): Promise<Blob> {
  return service({
    url: '/system/login-log/export',
    method: 'GET',
    responseType: 'blob',
  })
}
