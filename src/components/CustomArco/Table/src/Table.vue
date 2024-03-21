<script setup lang="ts">
import type { TableInstance } from '@arco-design/web-vue'

interface TableProps {
  total?: number
}

withDefaults(defineProps<TableProps>(), {
  total: 0,
})

const tableRef = ref<TableInstance>()

defineExpose({ arcoTable: tableRef })

interface Page {
  pageNo: number
  pageSize: number
}

const page = defineModel<Page>('page', {
  default: { pageNo: 1, pageSize: 20 },
})
</script>

<template>
  <ATable
    ref="tableRef"
    :scroll="{ x: '100%', y: '100%' }"
    :pagination="{
      total,
      current: page.pageNo,
      pageSize: page.pageSize,
      showTotal: true,
      showPageSize: true,
      showJumper: true,
    }"
    @page-change="(no: number) => page.pageNo = no"
    @page-size-change="(size: number) => page.pageSize = size"
  >
    <template v-for="slot in Object.keys($slots)" :key="slot" #[slot]="scope">
      <slot :name="slot" v-bind="scope ?? {}" />
    </template>
  </ATable>
</template>

<style scoped lang="less">

</style>
