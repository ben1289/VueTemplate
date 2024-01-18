import type { Dict } from '@/types'
import { isEqual } from 'lodash-es'
import { useDictStore } from '@/store'

export function getDictOptions(type: string): Dict[] {
  const dictStore = useDictStore()
  return Reflect.get(dictStore.dict, type) ?? []
}

export function getStrDictOptions(type: string): Dict<string>[] {
  return getDictOptions(type).map(dict => ({
    ...dict,
    value: `${dict.value}`,
  }))
}

export function getIntDictOptions(type: string): Dict<number>[] {
  return getDictOptions(type).map(dict => ({
    ...dict,
    value: Number.parseInt(`${dict.value}`),
  }))
}

export function getBoolDictOptions(type: string): Dict<boolean>[] {
  return getDictOptions(type).map(dict => ({
    ...dict,
    value: `${dict.value}` === 'true',
  }))
}

export function getDictLabel(type: string, value: any): string {
  return getDictOptions(type).find(dict => isEqual(dict.value, value))?.label ?? ''
}
