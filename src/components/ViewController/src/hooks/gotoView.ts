import type { InjectionKey } from 'vue'

export interface Attrs {
  props?: Record<string, any>
  events?: Record<string, Function>
}

export const GOTO_VIEW: InjectionKey<(view: string, attrs?: Attrs) => void> = Symbol('gotoView')

export default function useGotoView() {
  return inject(GOTO_VIEW)!
}
