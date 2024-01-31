<script setup lang="ts">
import Classics from './mode/Classics.vue'
import { useAppStore } from '@/store'

defineOptions({ name: 'Layout' })

const layouts = import.meta.glob('./mode/*.vue', { import: 'default', eager: true })
const appstore = useAppStore()
const layoutKey = Object.keys(layouts).find(key => key.includes(appstore.layout.mode))
const layout = layoutKey ? layouts[layoutKey] : Classics
</script>

<template>
  <component :is="layout" />
</template>

<style scoped lang="less">

</style>
