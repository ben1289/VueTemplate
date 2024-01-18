import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import * as auth from '@/utils/auth'
import { useGlobalConfig } from '@/hooks'
import { useDictStore, useRouteStore, useUserStore } from '@/store'

const whiteList = ['/login']

export default function createRouteGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    const globalConfig = useGlobalConfig()
    const userStore = useUserStore()
    const dictStore = useDictStore()
    const routeStore = useRouteStore()

    NProgress.start()
    if (await auth.getAccessToken()) {
      if (to.path === '/login') {
        return { path: globalConfig.homePath }
      } else {
        if (!userStore.isSet) {
          await userStore.setInfo()
        }
        if (!dictStore.isSet) {
          await dictStore.setDict()
        }
        if (!routeStore.isSet) {
          routeStore.setRoutes()
          const path = decodeURIComponent(from.query.redirect?.toString() ?? to.path)
          return { path, replace: true }
        } else {
          return true
        }
      }
    } else {
      return whiteList.includes(to.path) || { path: '/login', query: { redirect: to.fullPath } }
    }
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
