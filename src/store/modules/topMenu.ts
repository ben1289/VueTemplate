import type { MenuData } from '@/types'
import { defineStore } from 'pinia'

const useTopMenuStore = defineStore('topMenuStore', () => {
  const currentMenu = ref<MenuData>()
  const menus = computed(() => {
    if (!currentMenu.value)
      return []
    const { routePath, children } = currentMenu.value
    return children?.map(subMenu => ({
      ...subMenu,
      routePath: `${routePath}/${subMenu.routePath}`,
    })) ?? []
  })

  return {
    currentMenu,
    menus,
  }
})

export default useTopMenuStore
