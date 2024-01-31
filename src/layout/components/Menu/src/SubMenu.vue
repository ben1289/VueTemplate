<script setup lang="ts">
import type { MenuData } from '@/types'
import { useMenuClick } from '@/layout/hooks'
import { MenuShowTypeEnum, MenuTypeEnum } from '@/enums'

defineOptions({ name: 'SubMenu' })

const props = defineProps<{
  menu: MenuData
  parentPath?: string
}>()

const path = computed(() => {
  if (props.parentPath) {
    return [props.parentPath, props.menu.routePath].join('/')
  } else {
    return props.menu.routePath
  }
})
</script>

<template>
  <template v-if="menu.type === MenuTypeEnum.DIR">
    <ASubMenu :key="path" :title="menu.name">
      <template v-if="menu?.icon" #icon>
        <i :class="menu.icon" />
      </template>
      <template v-for="subMenu in menu.children" :key="subMenu.id">
        <SubMenu v-if="subMenu.visible" :menu="subMenu" :parent-path="path" />
      </template>
    </ASubMenu>
  </template>
  <template v-else>
    <AMenuItem :key="menu.showType === MenuShowTypeEnum.LINK ? menu.link : path" @click="useMenuClick(menu)">
      <template v-if="menu?.icon" #icon>
        <i :class="menu.icon" />
      </template>
      {{ menu.name }}
    </AMenuItem>
  </template>
</template>

<style scoped lang="less">

</style>
