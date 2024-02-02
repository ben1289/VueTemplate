<script setup lang="ts">
import { useGlobImport } from '@/hooks'
import { useAppStore } from '@/store'

defineOptions({ name: 'Layout' })

const layouts = import.meta.glob('./mode/*.vue', { import: 'default' })
const appstore = useAppStore()
const layout = useGlobImport(layouts, appstore.layout.mode)
</script>

<template>
  <component :is="layout" />
</template>

<style scoped lang="less">

</style>
