import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import * as auth from '@/utils/auth'
import { useGlobalConfig } from '@/hooks'
import { useDictStore, useRouteStore, useUserStore } from '@/store'

const whiteList = ['/login']

export default function createRouteGuard(router: Router) {
  const globalConfig = useGlobalConfig()

  router.beforeEach(async (to, from) => {
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
          const redirect = from.query.redirect
          if (redirect) {
            const redirectUrl = new URL(redirect.toString(), window.location.origin)
            const { pathname, searchParams } = redirectUrl
            return { path: pathname, query: Object.fromEntries(searchParams), replace: true }
          }
          const { path, query } = to
          return { path, query, replace: true }
        } else {
          return true
        }
      }
    } else {
      return whiteList.includes(to.path) || { path: '/login', query: { redirect: to.fullPath } }
    }
  })

  router.afterEach((to) => {
    const { meta: { title } } = to
    document.title = title ? `${globalConfig.appTitle} - ${title}` : globalConfig.appTitle
    NProgress.done()
  })
}
