import type { ResponseContent } from '@/types'
import service from '@/service'

/**
 * 获取菜单列表
 * @param data
 */
export function getMenuList(data: any): ResponseContent {
  return service({
    url: '/system/menu/list',
    method: 'POST',
    data,
  })
}

/**
 * 获取菜单详情
 * @param id
 */
export function getMenuDetail(id: number): ResponseContent {
  return service({
    url: '/system/menu/detail',
    method: 'GET',
    params: { id },
  })
}

/**
 * 保存菜单
 * @param data
 */
export function saveMenu(data: any): ResponseContent {
  return service({
    url: '/system/menu/save',
    method: 'POST',
    data,
  })
}

/**
 * 删除菜单
 * @param id
 */
export function deleteMenu(id: number): ResponseContent {
  return service({
    url: '/system/menu/delete',
    method: 'GET',
    params: { id },
  })
}
