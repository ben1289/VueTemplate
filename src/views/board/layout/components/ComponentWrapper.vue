<script setup lang="ts">
import { REMOVE_COMPONENT } from '@/views/board/injectKeys'

defineProps<{
  component: any
}>()

const removeComponent = inject(REMOVE_COMPONENT)!
</script>

<template>
  <div class="component-wrapper">
    <component :is="component" />
    <div class="wrapper-mask">
      <i class="i-mdi-close remove-button" @click="removeComponent(component.name)" />
    </div>
  </div>
</template>

<style scoped lang="less">
.component-wrapper {
  position: relative;

  .wrapper-mask {
    position: absolute;
    top: 1px;
    right: 1px;
    width: 0;
    height: 0;
    border: 25px solid rgba(255, 255, 255, 0.8);
    border-bottom-color: transparent;
    border-left-color: transparent;
    filter: brightness(0.9);

    .remove-button {
      position: absolute;
      top: -22px;
      right: -22px;
      font-size: 24px;
      color: rgb(var(--warning-6));
      cursor: pointer;
      transition: all 0.15s;

      &:hover {
        transform: rotate(90deg);
      }
    }
  }
}
</style>
