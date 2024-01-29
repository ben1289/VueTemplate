<script setup lang="ts">
import SubMenu from './SubMenu.vue'
import { MenuTypeEnum } from '@/enums'
import { useAppStore, useUserStore } from '@/store'

defineOptions({ name: 'MainMenu' })

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const userStore = useUserStore()

function handleMenuClick(key: string) {
  if (key === route.path)
    return
  const urlRegex = /^(https?):\/\/[^\s/$.?#].\S*$/
  if (urlRegex.test(key)) {
    window.open(key)
  } else {
    router.push(key)
  }
}
</script>

<template>
  <AMenu
    :selected-keys="[route.path]"
    :collapsed="appStore.menuCollapse"
    accordion
    auto-open-selected
    auto-scroll-into-view
    @menu-item-click="handleMenuClick"
  >
    <template v-for="menu in userStore.menus" :key="menu.id">
      <SubMenu v-if="menu.visible && menu.type !== MenuTypeEnum.BUTTON" :menu-data="menu" />
    </template>
  </AMenu>
</template>

<style scoped lang="less">
.arco-menu:not(.arco-menu-collapsed) {
  width: var(--layout-aside-width);
}
</style>
