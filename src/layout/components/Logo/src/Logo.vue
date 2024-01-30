<script setup lang="ts">
import { useGlobalConfig } from '@/hooks'

defineOptions({ name: 'Logo' })

const globalConfig = useGlobalConfig()
</script>

<template>
  <div class="layout-logo">
    <img src="/logo.svg" alt="" draggable="false">
    {{ globalConfig.appTitle }}
  </div>
</template>

<style scoped lang="less">
.layout-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: var(--layout-logo-height);
}
</style>
