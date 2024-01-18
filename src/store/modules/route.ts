import type { RouteRecordRaw } from 'vue-router'
import type { MenuData } from '@/types'
import { defineStore } from 'pinia'
import useUserStore from './user'
import router from '@/router'

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
    return menus.map((menu) => {
      const { parentId, path, component, componentName, children, name, keepAlive } = menu
      if (parentId === 0) {
        if (component) {
          return {
            path,
            component: Layout,
            children: [{
              path: '',
              name: componentName ?? Symbol(path),
              component: getRouteComp(component),
              children: [],
              meta: {
                title: name,
                componentName,
                keepAlive,
              },
            }],
          }
        } else {
          return {
            path,
            name: componentName ?? Symbol(path),
            component: Layout,
            children: children ? generateRoutes(children) : [],
            meta: {
              title: name,
              componentName,
              keepAlive,
            },
          }
        }
      } else {
        return {
          path,
          name: componentName ?? Symbol(path),
          component: getRouteComp(component),
          children: children ? generateRoutes(children) : [],
          meta: {
            title: name,
            componentName,
            keepAlive,
          },
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
    router.addRoute({ path: '/:path(.*)*', component: () => import('@/views/error/404.vue') })
    isSet.value = true
  }

  return {
    isSet,
    routes,
    setRoutes,
  }
})

export default useRouteStore
