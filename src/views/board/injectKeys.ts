import type { InjectionKey } from 'vue'

export const GET_COMPONENT = Symbol('getComponent') as InjectionKey<(name: string) => any>

export const REMOVE_COMPONENT = Symbol('removeComponent') as InjectionKey<(name: string) => void>
