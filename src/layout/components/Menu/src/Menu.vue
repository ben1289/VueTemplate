<script setup lang="ts">
import SubMenu from './SubMenu.vue'
import { useAppStore, useUserStore } from '@/store'

defineOptions({ name: 'MainMenu' })

const route = useRoute()
const appStore = useAppStore()
const userStore = useUserStore()
</script>

<template>
  <AMenu
    :default-selected-keys="[route.path]"
    :collapsed="appStore.menuCollapse"
    accordion
    auto-open-selected
    auto-scroll-into-view
    @menu-item-click="$router.push"
  >
    <template v-for="menu in userStore.menus" :key="menu.id">
      <SubMenu v-if="menu.visible" :menu-data="menu" />
    </template>
  </AMenu>
</template>

<style scoped lang="less">
.arco-menu:not(.arco-menu-collapsed) {
  width: var(--layout-aside-width);
}
</style>
