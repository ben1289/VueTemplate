<script setup lang="ts">
import { useAppStore, useTabRouteStore } from '@/store'

const appStore = useAppStore()
const tabRouteStore = useTabRouteStore()
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition v-if="appStore.content.animate" :name="appStore.content.animateMode" mode="out-in">
      <KeepAlive :include="[...tabRouteStore.keepAliveComponents]" :exclude="[...tabRouteStore.noKeepAliveComponents]">
        <component :is="Component" :key="route.fullPath" />
      </KeepAlive>
    </Transition>
    <KeepAlive v-else :include="[...tabRouteStore.keepAliveComponents]" :exclude="[...tabRouteStore.noKeepAliveComponents]">
      <component :is="Component" :key="route.fullPath" />
    </KeepAlive>
  </RouterView>
</template>

<style scoped lang="less">
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
