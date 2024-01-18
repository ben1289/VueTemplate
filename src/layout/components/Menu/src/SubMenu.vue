<script setup lang="ts">
import type { MenuData } from '@/types'

defineOptions({ name: 'SubMenu' })
const props = defineProps<Props>()

interface Props {
  menuData: MenuData
  parentPath?: string
}

const isSubMenu = computed(() => props.menuData?.children?.length)

const path = computed(() => {
  if (props.parentPath) {
    return [props.parentPath, props.menuData.path].join('/')
  } else {
    return props.menuData.path
  }
})
</script>

<template>
  <ASubMenu v-if="isSubMenu" :key="path" :title="menuData.name">
    <template v-if="menuData?.icon" #icon>
      <i :class="menuData.icon" />
    </template>
    <template v-for="subMenu in menuData.children" :key="subMenu.id">
      <SubMenu v-if="subMenu.visible" :menu-data="subMenu" :parent-path="path" />
    </template>
  </ASubMenu>

  <AMenuItem v-else :key="path">
    <template v-if="menuData?.icon" #icon>
      <i :class="menuData.icon" />
    </template>
    {{ menuData.name }}
  </AMenuItem>
</template>

<style scoped lang="less">

</style>
