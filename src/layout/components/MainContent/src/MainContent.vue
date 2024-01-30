<script setup lang="ts">
import { useTabRouteStore } from '@/store'

const tabRouteStore = useTabRouteStore()
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition name="fade" mode="out-in">
      <KeepAlive :include="[...tabRouteStore.keepAliveComponents]" :exclude="[...tabRouteStore.noKeepAliveComponents]">
        <component :is="Component" :key="route.fullPath" />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

<style scoped lang="less">
.fade-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
