import type { MaybeRef } from 'vue'
import { computedAsync } from '@vueuse/core'

type GlobImportOptions = {
  eager?: false
  needLazy?: boolean
} | {
  eager: true
}

/**
 * 动态导入模块
 * @param modules 模块源
 * @param path 模糊匹配模块路径
 * @param options \{ eager: 对应glob导入的eager, needLazy: 返回的模块是否为懒加载（默认否） }
 */
export default function useGlobImport(
  modules: Record<string, any>,
  path: MaybeRef<string | string[]>,
  options: GlobImportOptions = { eager: false, needLazy: false },
) {
  const moduleKeys = Object.keys(modules)

  function findModuleKey() {
    const _path = toValue(path)
    let moduleKey: undefined | string | string[]
    if (Array.isArray(_path)) {
      moduleKey = moduleKeys.filter(key => key.match(new RegExp(_path.join('|'))))
    } else {
      moduleKey = moduleKeys.find(key => key.includes(_path))
    }
    if (!moduleKey?.length) {
      throw new Error('No match module found')
    }
    return moduleKey
  }

  if (options.eager || options?.needLazy) {
    return computed(() => {
      const moduleKey = findModuleKey()
      if (Array.isArray(moduleKey)) {
        return moduleKey.map(key => modules[key])
      } else {
        return modules[moduleKey]
      }
    })
  } else {
    return computedAsync(async () => {
      const moduleKey = findModuleKey()
      if (Array.isArray(moduleKey)) {
        return await Promise.all(
          moduleKey.map(key => typeof modules[key] === 'function' ? modules[key]() : modules[key]),
        )
      } else {
        return typeof modules[moduleKey] === 'function' ? await modules[moduleKey]() : modules[moduleKey]
      }
    })
  }
}
