import type { ResponseContent } from '@/types'
import service from '@/service'

/**
 * 获取租户列表
 * @param data
 */
export function getTenantList(data: any): ResponseContent {
  return service({
    url: '/system/tenant/list',
    method: 'POST',
    data,
  })
}

/**
 * 获取租户详情
 * @param id
 */
export function getTenantDetail(id: number): ResponseContent {
  return service({
    url: '/system/tenant/detail',
    method: 'GET',
    params: { id },
  })
}

/**
 * 保存租户
 * @param data
 */
export function saveTenant(data: any): ResponseContent {
  return service({
    url: '/system/tenant/save',
    method: 'POST',
    data,
  })
}

/**
 * 更新租户状态
 * @param data
 */
export function updateTenantState(data: any): ResponseContent {
  return service({
    url: '/system/tenant/update-state',
    method: 'PUT',
    data,
  })
}

/**
 * 删除租户
 * @param id
 */
export function deleteTenant(id: number): ResponseContent {
  return service({
    url: '/system/tenant/delete',
    method: 'GET',
    params: { id },
  })
}

/**
 * 导出租户
 */
export function exportTenant(): Promise<Blob> {
  return service({
    url: '/system/tenant/export',
    method: 'GET',
    responseType: 'blob',
  })
}

/**
 * 获取租户套餐精简列表
 */
export function getTenantPackageSimpleList(): ResponseContent {
  return service({
    url: '/system/tenant-package/list-all-simple',
    method: 'GET',
  })
}

/**
 * 获取租户套餐列表
 * @param data
 */
export function getTenantPackageList(data: any): ResponseContent {
  return service({
    url: '/system/tenant-package/list',
    method: 'POST',
    data,
  })
}

/**
 * 获取租户套餐详情
 * @param id
 */
export function getTenantPackageDetail(id: number): ResponseContent {
  return service({
    url: '/system/tenant-package/detail',
    method: 'GET',
    params: { id },
  })
}

/**
 * 保存租户套餐
 * @param data
 */
export function saveTenantPackage(data: any): ResponseContent {
  return service({
    url: '/system/tenant-package/save',
    method: 'POST',
    data,
  })
}

/**
 * 更新租户套餐状态
 * @param data
 */
export function updateTenantPackageState(data: any): ResponseContent {
  return service({
    url: '/system/tenant-package/update-state',
    method: 'PUT',
    data,
  })
}

/**
 * 删除租户套餐
 * @param id
 */
export function deleteTenantPackage(id: number): ResponseContent {
  return service({
    url: '/system/tenant-package/delete',
    method: 'GET',
    params: { id },
  })
}
