import type { MaybeRef } from 'vue'
import { computedAsync } from '@vueuse/core'

type GlobImportOptions = (
    { eager?: false, needLazy?: boolean }
    | { eager: true }
  )
  & { needRaw?: boolean }

/**
 * 动态导入模块
 * @param modules 模块源
 * @param path 模糊匹配模块路径
 * @param options 额外参数
 * @param options.eager 对应glob导入的eager
 * @param options.needLazy 是否需要返回懒加载模块（默认否）
 * @param options.needRaw 是否需要返回raw值（默认否）
 */
export default function useGlobImport(
  modules: Record<string, any>,
  path: MaybeRef<string | string[]>,
  options: GlobImportOptions = { eager: false, needLazy: false, needRaw: false },
) {
  const moduleKeys = Object.keys(modules)

  function findModule() {
    const _path = toValue(path)
    let module
    if (Array.isArray(_path)) {
      module = moduleKeys.filter(key => key.match(new RegExp(_path.join('|')))).map(key => modules[key])
    } else {
      const key = moduleKeys.find(key => key.includes(_path))
      if (key) {
        module = modules[key]
      }
    }
    if (!module || (Array.isArray(module) && module.length === 0)) {
      throw new Error('No match module found')
    }
    return module
  }

  if (options.eager || options?.needLazy) {
    return options.needRaw ? findModule() : computed(findModule)
  } else {
    const _fn = async () => {
      const module = findModule()
      if (Array.isArray(module)) {
        return await Promise.all(module.map(mod => typeof mod === 'function' ? mod() : mod))
      } else {
        return typeof module === 'function' ? await module() : module
      }
    }
    return options.needRaw ? _fn() : computedAsync(_fn)
  }
}
