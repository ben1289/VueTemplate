<script setup lang="ts">
import type { TableInstance } from '@arco-design/web-vue'
import type { TableProps } from './Table'
import { VueDraggable } from 'vue-draggable-plus'
import { cloneDeep } from 'lodash-es'
import { useStorage } from '@/hooks'

const props = withDefaults(defineProps<TableProps>(), {
  columns: () => [],
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

const { indexedDB } = useStorage()

watch(() => props.total, (_total) => {
  const { pageNo, pageSize } = toValue(page)
  if (pageNo * pageSize > _total) {
    nextTick(() => {
      page.value.pageNo = Math.ceil(_total / pageSize)
    })
  }
})

const showColumns = ref<string[]>([])
const _columns = ref(cloneDeep(props.columns))
const colSetting = computed(() => props.id && props.columns.every(({ id }) => id))

;(async () => {
  if (props.id) {
    const { showColumns: storedShowCols, columns: storedCols } = await indexedDB.getItem<any>(props.id) ?? {}
    if (storedShowCols) {
      showColumns.value = storedShowCols
    } else {
      showColumns.value = props.columns.map(({ id }) => id ?? '')
    }
    if (storedCols) {
      _columns.value.sort((a, b) => storedCols.indexOf(a.id) - storedCols.indexOf(b.id))
    }
  }
})()

function handlePopupVisibleChange(visible: boolean) {
  if (!visible && props.id) {
    indexedDB.setItem(props.id, {
      showColumns: toRaw(showColumns.value),
      columns: toValue(_columns).map(({ id }) => id),
    })
  }
}
</script>

<template>
  <ATable
    ref="tableRef"
    :columns="colSetting ? _columns.filter(col => showColumns.includes(col.id!)) : columns"
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
    <template #pagination-right>
      <APopover v-if="colSetting" trigger="click" position="bottom" @popup-visible-change="handlePopupVisibleChange">
        <AButton class="m-l-8px">
          <template #icon>
            <i class="i-mdi-cog-outline text-18px" />
          </template>
        </AButton>

        <template #content>
          <ACheckboxGroup v-model="showColumns">
            <VueDraggable v-model="_columns" class="grid min-w-120px gap-4px" :animation="150" handle=".i-mdi-drag">
              <div v-for="col in _columns" :key="col.id" class="flex items-center justify-between">
                <ACheckbox :value="col.id">
                  {{ col.title }}
                </ACheckbox>
                <i class="i-mdi-drag cursor-move text-18px" />
              </div>
            </VueDraggable>
          </ACheckboxGroup>
        </template>
      </APopover>
    </template>

    <template v-for="slot in Object.keys($slots)" :key="slot" #[slot]="scope">
      <slot :name="slot" v-bind="scope ?? {}" />
    </template>
  </ATable>
</template>

<style scoped lang="less">

</style>
