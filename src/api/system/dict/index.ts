import type { ResponseContent } from '@/types'
import service from '@/service'

/**
 * 获取精简字典列表
 */
export function getDictTypeSimpleList(): ResponseContent {
  return service({
    url: '/system/dict-type/list-all-simple',
    method: 'GET',
  })
}

/**
 * 获取字典列表
 * @param params
 */
export function getDictTypeList(params: any): ResponseContent {
  return service({
    url: '/system/dict-type/page',
    method: 'GET',
    params,
  })
}

/**
 * 获取字典详情
 * @param id
 */
export function getDictType(id: number): ResponseContent {
  return service({
    url: '/system/dict-type/get',
    method: 'GET',
    params: { id },
  })
}

/**
 * 创建字典
 * @param data
 */
export function createDictType(data: any): ResponseContent {
  return service({
    url: '/system/dict-type/create',
    method: 'POST',
    data,
  })
}

/**
 * 更新字典
 * @param data
 */
export function updateDictType(data: any): ResponseContent {
  return service({
    url: '/system/dict-type/update',
    method: 'PUT',
    data,
  })
}

/**
 * 删除字典
 * @param id
 */
export function deleteDictType(id: number): ResponseContent {
  return service({
    url: '/system/dict-type/delete',
    method: 'DELETE',
    params: { id },
  })
}

/**
 * 导出字典
 * @param params
 */
export function exportDictType(params: any): Promise<Blob> {
  return service({
    url: '/system/dict-type/export',
    method: 'GET',
    responseType: 'blob',
    params,
  })
}

/**
 * 获取精简字典数据列表
 */
export function getDictDataSimpleList(): ResponseContent {
  return service({
    url: '/system/dict-data/list-all-simple',
    method: 'GET',
  })
}

/**
 * 获取字典数据列表
 * @param params
 */
export function getDictDataList(params: any): ResponseContent {
  return service({
    url: '/system/dict-data/page',
    method: 'GET',
    params,
  })
}

/**
 * 获取字典数据详情
 * @param id
 */
export function getDictData(id: number): ResponseContent {
  return service({
    url: '/system/dict-data/get',
    method: 'GET',
    params: { id },
  })
}

/**
 * 创建字典数据
 * @param data
 */
export function createDictData(data: any): ResponseContent {
  return service({
    url: '/system/dict-data/create',
    method: 'POST',
    data,
  })
}

/**
 * 更新字典数据
 * @param data
 */
export function updateDictData(data: any): ResponseContent {
  return service({
    url: '/system/dict-data/update',
    method: 'PUT',
    data,
  })
}

/**
 * 删除字典数据
 * @param id
 */
export function deleteDictData(id: number): ResponseContent {
  return service({
    url: '/system/dict-data/delete',
    method: 'DELETE',
    params: { id },
  })
}

/**
 * 导出字典数据
 * @param params
 */
export function exportDictData(params: any): Promise<Blob> {
  return service({
    url: '/system/dict-data/export',
    method: 'GET',
    responseType: 'blob',
    params,
  })
}
