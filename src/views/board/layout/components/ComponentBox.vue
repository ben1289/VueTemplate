<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import ComponentWrapper from './ComponentWrapper.vue'
import { GET_COMPONENT } from '@/views/board/injectKeys'

defineOptions({
  name: 'ComponentBox',
  inheritAttrs: false,
})

defineProps<{
  draggable: boolean
}>()

const modelValue = defineModel<string[]>({ required: true })

const getComponent = inject(GET_COMPONENT)!
</script>

<template>
  <VueDraggable
    v-model="modelValue"
    class="component-box"
    :class="{ draggable }"
    :animation="150"
    group="component"
    v-bind="$attrs"
    :disabled="!draggable"
  >
    <ComponentWrapper v-for="name in modelValue" :key="name" :component="getComponent(name)" />
  </VueDraggable>
</template>

<style scoped lang="less">
.component-box {
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%;

  &.draggable {
    padding: 10px;
    border: 1px dashed rgb(var(--primary-6));

    & > :deep(*) {
      cursor: move;
    }
  }
}
</style>
