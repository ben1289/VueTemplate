<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

defineOptions({ name: 'FullScreen' })

const { isSupported, isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <span v-if="isSupported" class="tool-button" @click="toggle">
    <i :class="isFullscreen ? 'i-mdi-fullscreen-exit' : 'i-mdi-fullscreen'" class="text-24px" />
  </span>
</template>

<style scoped lang="less">

</style>
