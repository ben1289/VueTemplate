<script setup lang="ts">
import { useAppStore } from '@/store'

defineOptions({ name: 'Collapse' })

const appStore = useAppStore()
</script>

<template>
  <span class="tool-button" @click="appStore.toggleMenuCollapse()">
    <i :class="appStore.menuCollapse ? 'i-mdi-menu-close' : 'i-mdi-menu-open'" class="text-24px" />
  </span>
</template>

<style scoped lang="less">

</style>
