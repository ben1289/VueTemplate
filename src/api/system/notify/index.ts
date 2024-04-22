import type { ResponseContent } from '@/types'
import service from '@/service'

/**
 * 获取通知列表
 * @param data
 */
export function getNotifyList(data: any): ResponseContent {
  return service({
    url: '/system/notify/list',
    method: 'POST',
    data,
  })
}
