import type { InjectionKey } from 'vue'

export const GET_COMPONENT: InjectionKey<(name: string) => any> = Symbol('getComponent')

export const REMOVE_COMPONENT: InjectionKey<(name: string) => void> = Symbol('removeComponent')
