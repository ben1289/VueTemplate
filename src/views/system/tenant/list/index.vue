<script setup lang="ts">
import ViewController from '@/components/ViewController'

defineOptions({ name: 'TenantListPage' })

const views = import.meta.glob('./*.vue', { import: 'default' })
</script>

<template>
  <ViewController :views="views" default-view="main" keep-alive include="TenantListMain" />
</template>

<style scoped lang="less">

</style>
