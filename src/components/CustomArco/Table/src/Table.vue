<script setup lang="ts">
interface TableProps {
  total: number
}

withDefaults(defineProps<TableProps>(), {
  total: 0,
})

interface Page {
  pageNo: number
  pageSize: number
}

const defaultCurrent = 1
const defaultPageSize = 20
const page = defineModel<Page>('page', {
  default: { pageNo: defaultCurrent, pageSize: defaultPageSize },
})
</script>

<template>
  <ATable
    :scroll="{ y: '100%' }"
    :pagination="{
      total,
      defaultCurrent,
      defaultPageSize,
      showTotal: true,
      showPageSize: true,
      showJumper: true,
    }"
    @page-change="(no) => page.pageNo = no"
    @page-size-change="(size) => page.pageSize = size"
  >
    <template v-for="slot in Object.keys($slots)" :key="slot" #[slot]="scope">
      <slot :name="slot" v-bind="scope ?? {}" />
    </template>
  </ATable>
</template>

<style scoped lang="less">

</style>