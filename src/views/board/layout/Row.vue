<script setup lang="ts">
import ComponentBox from './components/ComponentBox.vue'

defineOptions({ name: 'BoardRowLayout' })

defineProps<{
  customMode: boolean
}>()

const componentNames = defineModel<string[]>({
  required: true,
  get: names => names.flat(),
  set: names => [names, [], []],
})
</script>

<template>
  <AGrid :cols="1" :row-gap="15">
    <ComponentBox v-model="componentNames" :draggable="customMode" />
  </AGrid>
</template>

<style scoped lang="less">

</style>
