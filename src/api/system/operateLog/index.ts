import type { ResponseContent } from '@/types'
import service from '@/service'

/**
 * 获取操作日志列表
 * @param data
 */
export function getOperateLogList(data: any): ResponseContent {
  return service({
    url: '/system/operate-log/page',
    method: 'POST',
    data,
  })
}

/**
 * 导出操作日志
 */
export function exportOperateLog(): Promise<Blob> {
  return service({
    url: '/system/operate-log/export',
    method: 'GET',
    responseType: 'blob',
  })
}
