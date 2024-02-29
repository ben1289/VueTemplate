<script setup lang="ts">
import type { PopoverTableProps } from './PopoverTable'
import type { GetFetchData } from '../types'
import SearchButton from './SearchButton.vue'
import { CusTable } from '@/components/CustomArco'

defineOptions({ name: 'PopoverTable' })

const props = defineProps<PopoverTableProps>()

const emit = defineEmits<{
  (e: 'change', row: Row): void
}>()

type Row = GetFetchData<typeof props.fetchData>

/**
 * popover
 */
const visible = ref(false)

function handleVisibleChange(visible: boolean) {
  if (visible && toValue(tbData).length === 0) {
    query()
  }
}

/**
 * table
 */
const defaultCurrent = 1
const defaultPageSize = 20
const queryStr = ref('')
const tbLoading = ref(false)
const tbData = ref<Row[]>([])
const tbTotal = ref(0)
const tbPage = reactive({ pageNo: defaultCurrent, pageSize: defaultPageSize })

watch(tbPage, () => {
  query()
})

async function query() {
  tbLoading.value = true
  const { data, total } = await props.fetchData({ ...tbPage, queryStr: toValue(queryStr) })
  tbData.value = data
  tbTotal.value = total
  tbLoading.value = false
}

function handleRowDblclick(row: Row) {
  emit('change', row)
  visible.value = false
}
</script>

<template>
  <APopover
    v-model:popup-visible="visible"
    class="w-400px"
    trigger="click"
    position="bottom"
    @popup-visible-change="handleVisibleChange"
  >
    <SearchButton />

    <template #content>
      <AInput v-model="queryStr" class="m-b-10px !w-80%" @press-enter="query">
        <template #append>
          <SearchButton @click="query" />
        </template>
      </AInput>

      <CusTable
        v-model:page="tbPage"
        :loading="tbLoading"
        :columns="columns"
        :data="tbData"
        :total="tbTotal"
        :scroll="{ y: 260 }"
        :pagination="{
          total: tbTotal,
          defaultCurrent,
          defaultPageSize,
          simple: true,
          showTotal: true,
          showPageSize: true,
          showJumper: true,
        }"
        :row-key="rowKey"
        @row-dblclick="handleRowDblclick"
      />
    </template>
  </APopover>
</template>

<style scoped lang="less">
:deep(.arco-input-append) {
  padding: 0;
  border: none;
}
</style>
