import type { Dict } from '@/types'
import { useDictStore } from '@/store'

export function getDictOptions(type: string): Dict[] {
  const dictStore = useDictStore()
  return Reflect.get(dictStore.dict, type) ?? []
}

export function getDictLabel(type: string, value: any): string {
  return getDictOptions(type).find(dict => dict.value == value)?.label ?? ''
}
