import type { RouteRecordRaw } from 'vue-router'
import { useGlobalConfig } from '@/hooks'

const globalConfig = useGlobalConfig()

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: globalConfig.homePath,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/redirect:path(.*)',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/:path(.*)*',
    name: 'error404',
    component: () => import('@/views/error/404.vue'),
  },
]

export default routes
