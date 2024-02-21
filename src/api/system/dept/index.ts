import type { ResponseContent } from '@/types'
import service from '@/service'

/**
 * 获取部门精简列表
 */
export function getDeptSimpleList(): ResponseContent {
  return service({
    url: '/system/dept/list-all-simple',
    method: 'GET',
  })
}
