import type { MenuShowTypeEnum, MenuTypeEnum } from '@/enums'

export type ResponseContent<T = any> = Promise<{
  code: number
  msg: string
  data: T
}>

export interface MenuData {
  id: number
  parentId: number
  type: MenuTypeEnum
  name: string
  icon: string
  showType: MenuShowTypeEnum
  routePath: string
  routeName: string
  componentPath: string
  componentName: string
  link: string
  permission: string
  sort?: number
  keepAlive: boolean
  visible: boolean
  state: boolean
  children?: MenuData[]
}

export interface Dict<T = any> extends Record<string, any> {
  dictType: string
  label: string
  value: T
}

/*
 * 类型工具
 */

export type WithPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
