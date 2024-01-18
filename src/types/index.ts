export type ResponseContent<T = any> = Promise<{
  code: number
  msg: string
  data: T
}>

export interface MenuData {
  id: number
  parentId: number
  name: string
  path: string
  visible: boolean
  keepAlive: boolean
  component?: string
  componentName?: string
  icon?: string
  children?: MenuData[]
}

export interface Dict<T = any> extends Record<string, any> {
  dictType: string
  label: string
  value: T
}
