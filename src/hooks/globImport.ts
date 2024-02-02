import type { MaybeRef } from 'vue'
import { computedAsync } from '@vueuse/core'

/**
 * 动态导入模块
 * @param modules 模块源
 * @param path 模糊匹配模块路径
 * @param needLazy 是否需要返回懒加载的模块
 */
export default function useGlobImport(modules: Record<string, any>, path: MaybeRef<string>, needLazy = false) {
  function findModuleKey() {
    const moduleKey = Object.keys(modules).find(key => key.includes(toValue(path)))
    if (!moduleKey) {
      throw new Error('No match module found')
    }
    return moduleKey
  }

  if (needLazy) {
    return computed(() => modules[findModuleKey()])
  } else {
    return computedAsync(async () => {
      const moduleKey = findModuleKey()
      return typeof modules[moduleKey] === 'function' ? await modules[moduleKey]() : modules[moduleKey]
    })
  }
}
