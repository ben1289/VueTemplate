<script setup lang="ts">
import FullScreen from '@/layout/components/FullScreen'
import Translate from '@/layout/components/Translate'
import UserInfo from '@/layout/components/UserInfo'
import { useAppStore } from '@/store'

defineOptions({ name: 'ToolBar' })

const appStore = useAppStore()

const headerHeight = computed(() => `${appStore.header.height}px`)
</script>

<template>
  <div class="flex items-center gap-10px">
    <FullScreen />
    <Translate />
    <UserInfo />
  </div>
</template>

<style scoped lang="less">
:deep(.icon-btn) {
  --size: calc(v-bind(headerHeight) / 2);
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: var(--size);
  min-height: var(--size);
  color: var(--color-text-2);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    backdrop-filter: brightness(0.95);
  }
}
</style>
