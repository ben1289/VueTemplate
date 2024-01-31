<script setup lang="ts">
import type { MenuData } from '@/types'
import SubMenu from './SubMenu.vue'

defineOptions({ name: 'MainMenu' })

defineProps<{
  menus: MenuData[]
}>()

const route = useRoute()
</script>

<template>
  <AMenu
    :selected-keys="[route.path]"
    accordion
    auto-open-selected
    auto-scroll-into-view
  >
    <template v-for="menu in menus" :key="menu.id">
      <SubMenu v-if="menu.visible" :menu="menu" />
    </template>
  </AMenu>
</template>

<style scoped lang="less">

</style>
