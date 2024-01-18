import type { RouteLocation } from 'vue-router'
import { defineStore } from 'pinia'
import router from '@/router'
import { useGlobalConfig } from '@/hooks'

const globalConfig = useGlobalConfig()

const useTabRouteStore = defineStore('tabRouteStore', () => {
  const homeRoute = router.resolve(globalConfig.homePath)
  const routes = ref<RouteLocation[]>([homeRoute])
  const keepAliveComponents = computed(() => {
    const components: string[] = []
    toValue(routes).forEach((route) => {
      const { keepAlive, componentName } = route.meta || {}
      if (keepAlive && componentName) {
        components.push(componentName as string)
      }
    })
    return components
  })

  /**
   * 添加路由
   * @param route
   */
  function addRoute(route: RouteLocation) {
    if (toValue(routes).some(item => item.fullPath === route.fullPath)) {
      return
    }
    routes.value.push({ ...route })
  }

  /**
   * 删除路由
   * @param route
   */
  function removeRoute(route: RouteLocation) {
    routes.value = toValue(routes).filter(item => item.fullPath !== route.fullPath)
  }

  /**
   * 删除其他路由
   * @param route
   */
  function removeOtherRoute(route: RouteLocation) {
    removeAllRoute()
    addRoute(route)
  }

  /**
   * 删除所有路由
   */
  function removeAllRoute() {
    routes.value = [homeRoute]
  }

  return { routes, keepAliveComponents, addRoute, removeRoute, removeOtherRoute, removeAllRoute }
})

export default useTabRouteStore
