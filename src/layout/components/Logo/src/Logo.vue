<script setup lang="ts">
import { LayoutModeEnum } from '@/enums'
import { useGlobalConfig } from '@/hooks'
import { useAppStore } from '@/store'

defineOptions({ name: 'Logo' })

const globalConfig = useGlobalConfig()
const appStore = useAppStore()
</script>

<template>
  <div class="layout-logo">
    <img src="/logo.svg" alt="" draggable="false">
    <Transition>
      <span v-show="appStore.layoutMode === LayoutModeEnum.HEADER_FULL || !appStore.menuCollapse">
        {{ globalConfig.appTitle }}
      </span>
    </Transition>
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

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}

.v-enter-from,
.v-enter-to,
.v-leave-from,
.v-leave-to {
  position: absolute;
  opacity: 0;
}
</style>
