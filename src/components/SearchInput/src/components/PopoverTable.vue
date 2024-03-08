<script setup lang="ts">
import type { PopoverTableProps } from './PopoverTable'
import type { GetFetchData } from '../types'
import SearchButton from './SearchButton.vue'
import { CusTable } from '@/components/CustomArco'

defineOptions({ name: 'PopoverTable' })

const props = defineProps<PopoverTableProps>()

const emit = defineEmits<{
  (e: 'change', row: any): void
}>()

type Row = GetFetchData<typeof props.fetchData>

const visible = ref(false)

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

const selectedKeys = defineModel<(string | number)[]>('selectedKeys', { default: () => [] })
const selectedRows = new Map()

props.multiple && watch(selectedKeys, (keys) => {
  toValue(tbData).forEach((row) => {
    const key = row[props.rowKey]
    if (keys.includes(key)) {
      selectedRows.set(key, row)
    } else {
      selectedRows.delete(key)
    }
  })
  emit('change', [...selectedRows.values()])
}, { deep: true })

function handleVisibleChange(visible: boolean) {
  if (visible && toValue(tbData).length === 0) {
    query()
  }
}
</script>

<template>
  <AFormItem no-style>
    <APopover
      v-model:popup-visible="visible"
      class="w-400px"
      trigger="click"
      position="bottom"
      @popup-visible-change="handleVisibleChange"
    >
      <SearchButton />

      <template #content>
        <AInput v-model="queryStr" class="m-b-10px !w-80%" allow-clear @press-enter="query">
          <template #append>
            <SearchButton @click="query" />
          </template>
        </AInput>

        <CusTable
          v-model:selected-keys="selectedKeys"
          v-model:page="tbPage"
          :loading="tbLoading"
          :columns="columns"
          :data="tbData"
          :total="tbTotal"
          :scroll="{ y: 260 }"
          :row-selection="multiple ? { type: 'checkbox', showCheckedAll: true, fixed: true } : undefined"
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
  </AFormItem>
</template>

<style scoped lang="less">
:deep(.arco-input-append) {
  padding: 0;
  border: none;
}
</style>
