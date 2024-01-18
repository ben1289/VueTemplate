import { createPinia } from 'pinia'
import persistedState from 'pinia-plugin-persistedstate'
import useAppStore from './modules/app'
import useUserStore from './modules/user'
import useDictStore from './modules/dict'
import useRouteStore from './modules/route'
import useTabRouteStore from './modules/tabRoute'

const pinia = createPinia()
pinia.use(persistedState)

export { useAppStore, useUserStore, useDictStore, useRouteStore, useTabRouteStore }
export default pinia
