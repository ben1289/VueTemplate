import type { ResponseContent } from '@/types'
import service from '@/service'

/**
 * 获取角色精简列表
 */
export function getRoleSimpleList(): ResponseContent {
  return service({
    url: '/system/role/list-all-simple',
    method: 'GET',
  })
}
