import type { Dict, ResponseContent } from '@/types'
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
 * @param data
 */
export function getDictTypeList(data: any): ResponseContent {
  return service({
    url: '/system/dict-type/page',
    method: 'POST',
    data,
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
 * 保存字典
 * @param data
 */
export function saveDictType(data: any): ResponseContent {
  return service({
    url: '/system/dict-type/save',
    method: 'POST',
    data,
  })
}

/**
 * 更新字典状态
 * @param data
 */
export function updateDictTypeState(data: any): ResponseContent {
  return service({
    url: '/system/dict-type/update-state',
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
 */
export function exportDictType(): Promise<Blob> {
  return service({
    url: '/system/dict-type/export',
    method: 'GET',
    responseType: 'blob',
  })
}

/**
 * 获取精简字典数据列表
 */
export function getDictDataSimpleList(): ResponseContent<Dict[]> {
  return service({
    url: '/system/dict-data/list-all-simple',
    method: 'GET',
  })
}

/**
 * 获取字典数据列表
 * @param data
 */
export function getDictDataList(data: any): ResponseContent {
  return service({
    url: '/system/dict-data/page',
    method: 'POST',
    data,
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
 * 保存字典数据
 * @param data
 */
export function saveDictData(data: any): ResponseContent {
  return service({
    url: '/system/dict-data/save',
    method: 'POST',
    data,
  })
}

/**
 * 更新字典数据状态
 * @param data
 */
export function updateDictDataState(data: any): ResponseContent {
  return service({
    url: '/system/dict-data/update-state',
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
