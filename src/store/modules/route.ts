import type { RouteRecordRaw } from 'vue-router'
import type { MenuData } from '@/types'
import { defineStore } from 'pinia'
import useUserStore from './user'
import router from '@/router'
import { MenuShowTypeEnum, MenuTypeEnum } from '@/enums'

const useRouteStore = defineStore('routeStore', () => {
  const isSet = ref(false)
  const routes = ref<RouteRecordRaw[]>([])
  const modules = import.meta.glob('@/views/**/*.vue')

  function getRouteComp(path?: string) {
    if (!path) {
      return
    }
    const moduleKey = Object.keys(modules).find(key => key.includes(path))
    if (moduleKey) {
      return modules[moduleKey]
    }
  }

  function generateRoutes(menus: MenuData[]): RouteRecordRaw[] {
    const Layout = () => import('@/layout/index.vue')
    return menus
      .filter(menu => menu.showType !== MenuShowTypeEnum.LINK)
      .map((menu) => {
        const {
          name,
          showType,
          routePath,
          routeName,
          componentPath,
          componentName,
          keepAlive,
          children,
        } = menu
        if (menu.type === MenuTypeEnum.DIR) {
          // MenuTypeEnum.DIR
          return {
            path: routePath,
            name: routeName || undefined,
            meta: { title: name, componentName, keepAlive },
            children: children ? generateRoutes(children) : [],
          }
        } else {
          // MenuTypeEnum.MENU
          const route = {
            path: routePath,
            name: routeName || undefined,
            component: getRouteComp(componentPath),
            meta: { title: name, componentName, keepAlive },
            children: [],
          }
          if (showType === MenuShowTypeEnum.LAYOUT) {
            // MenuShowTypeEnum.LAYOUT
            return {
              path: '',
              component: Layout,
              redirect: { name: 'error404' },
              children: [
                route,
              ],
            }
          } else {
            // MenuShowTypeEnum.FULL_PAGE
            return route
          }
        }
      })
  }

  function setRoutes() {
    if (toValue(isSet)) {
      return
    }
    if (toValue(routes).length === 0) {
      const userStore = useUserStore()
      routes.value = generateRoutes(userStore.menus)
    }
    toValue(routes).forEach(route => router.addRoute(route))
    isSet.value = true
  }

  async function reset() {
    isSet.value = false
    routes.value = []
    await nextTick()
  }

  return {
    isSet,
    routes,
    setRoutes,
    reset,
  }
})

export default useRouteStore
