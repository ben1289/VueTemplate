<script setup lang="ts">
import type { MenuData } from '@/types'
import { MenuShowTypeEnum, MenuTypeEnum } from '@/enums'

defineOptions({ name: 'SubMenu' })

const props = defineProps<{
  menuData: MenuData
  parentPath?: string
}>()

const path = computed(() => {
  if (props.parentPath) {
    return [props.parentPath, props.menuData.routePath].join('/')
  } else {
    return props.menuData.routePath
  }
})
</script>

<template>
  <template v-if="menuData.type === MenuTypeEnum.DIR">
    <ASubMenu :key="path" :title="menuData.name">
      <template v-if="menuData?.icon" #icon>
        <i :class="menuData.icon" />
      </template>
      <template v-for="subMenu in menuData.children" :key="subMenu.id">
        <SubMenu v-if="subMenu.visible" :menu-data="subMenu" :parent-path="path" />
      </template>
    </ASubMenu>
  </template>
  <template v-else>
    <AMenuItem :key="menuData.showType === MenuShowTypeEnum.LINK ? menuData.link : path">
      <template v-if="menuData?.icon" #icon>
        <i :class="menuData.icon" />
      </template>
      {{ menuData.name }}
    </AMenuItem>
  </template>
</template>

<style scoped lang="less">

</style>
