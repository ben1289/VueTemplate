<script setup lang="ts">
import type { MenuData } from '@/types'
import { useTopMenuStore, useUserStore } from '@/store'
import { useMenuClick } from '@/layout/hooks'

defineOptions({ name: 'TopMenu' })

const route = useRoute()
const userStore = useUserStore()
const topMenuStore = useTopMenuStore()

watch(route, () => {
  topMenuStore.currentMenu = userStore.menus.find(menu => route.path.includes(menu.routePath))
}, { immediate: true })

function handleMenuClick(menu: MenuData) {
  topMenuStore.currentMenu = menu
  useMenuClick(menu)
}
</script>

<template>
  <AMenu mode="horizontal" :selected-keys="[topMenuStore.currentMenu?.routePath]">
    <template v-for="menu in userStore.menus" :key="menu.id">
      <AMenuItem v-if="menu.visible" :key="menu.routePath" @click="handleMenuClick(menu)">
        {{ menu.name }}
      </AMenuItem>
    </template>
  </AMenu>
</template>

<style scoped lang="less">
.arco-menu {
  :deep(.arco-menu-inner) {
    padding: 0;
  }

  .arco-menu-item:not(.arco-menu-item + .arco-menu-item) {
    margin-left: 0;
  }
}
</style>
