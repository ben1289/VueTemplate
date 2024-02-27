<script setup lang="ts">
import ViewController from '@/components/ViewController'

defineOptions({ name: 'DictPage' })

const views = import.meta.glob('./*/*.vue', { import: 'default' })
</script>

<template>
  <ViewController :views="views" default-view="type/main" keep-alive include="DictTypeMain" />
</template>

<style scoped lang="less">

</style>
