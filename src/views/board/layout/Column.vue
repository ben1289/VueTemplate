<script setup lang="ts">
import type { NestedArray } from '../types'
import ComponentBox from './components/ComponentBox.vue'

defineOptions({ name: 'BoardColumnLayout' })

defineProps<{
  customMode: boolean
}>()

const componentNames = defineModel<NestedArray<string>>({ required: true })
</script>

<template>
  <ARow class="!items-stretch" :gutter="[15, 15]">
    <ACol :xs="24" :sm="12" :lg="12">
      <ComponentBox v-model="componentNames[0]" :draggable="customMode" />
    </ACol>

    <ACol :xs="24" :sm="12" :lg="6">
      <ComponentBox v-model="componentNames[1]" :draggable="customMode" />
    </ACol>

    <ACol :xs="24" :sm="12" :lg="6">
      <ComponentBox v-model="componentNames[2]" :draggable="customMode" />
    </ACol>
  </ARow>
</template>

<style scoped lang="less">

</style>
