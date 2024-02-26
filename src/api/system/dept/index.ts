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

/**
 * 获取部门列表
 * @param data
 */
export function getDeptList(data: any): ResponseContent {
  return service({
    url: '/system/dept/list',
    method: 'POST',
    data,
  })
}

/**
 * 获取部门详情
 * @param id
 */
export function getDeptDetail(id: number): ResponseContent {
  return service({
    url: '/system/dept/detail',
    method: 'GET',
    params: { id },
  })
}

/**
 * 保存部门
 * @param data
 */
export function saveDept(data: any): ResponseContent {
  return service({
    url: '/system/dept/save',
    method: 'POST',
    data,
  })
}

/**
 * 更新部门状态
 * @param data
 */
export function updateDeptState(data: any): ResponseContent {
  return service({
    url: '/system/dept/update-state',
    method: 'PUT',
    data,
  })
}

/**
 * 删除部门
 * @param id
 */
export function deleteDept(id: number): ResponseContent {
  return service({
    url: '/system/dept/delete',
    method: 'GET',
    params: { id },
  })
}
