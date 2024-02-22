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

/**
 * 获取角色列表
 * @param data
 */
export function getRoleList(data: any): ResponseContent {
  return service({
    url: '/system/role/list',
    method: 'POST',
    data,
  })
}

/**
 * 获取角色详情
 * @param id
 */
export function getRoleDetail(id: number): ResponseContent {
  return service({
    url: '/system/role/detail',
    method: 'GET',
    params: { id },
  })
}

/**
 * 保存角色
 * @param data
 */
export function saveRole(data: any): ResponseContent {
  return service({
    url: '/system/role/save',
    method: 'POST',
    data,
  })
}

/**
 * 更新角色状态
 * @param data
 */
export function updateRoleState(data: any): ResponseContent {
  return service({
    url: '/system/role/update-state',
    method: 'PUT',
    data,
  })
}

/**
 * 删除角色
 * @param id
 */
export function deleteRole(id: number): ResponseContent {
  return service({
    url: '/system/role/delete',
    method: 'GET',
    params: { id },
  })
}

/**
 * 导出角色
 */
export function exportRole(): Promise<Blob> {
  return service({
    url: '/system/role/export',
    method: 'GET',
    responseType: 'blob',
  })
}
