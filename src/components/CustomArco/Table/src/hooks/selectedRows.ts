import type { MaybeRef, Ref } from 'vue'
import { unionBy } from 'lodash-es'

interface Options {
  rowKey?: string
  deep?: boolean
}

export default function useSelectedRows(
  selectedRowKeys: MaybeRef<string[] | number[]>,
  tbData: MaybeRef<Record<string, any>[]>,
  options: Options,
): Ref<Record<string, any>[]> {
  const { rowKey = 'id', deep = false } = options
  const selectedRows = ref<Record<string, any>[]>([])

  watch(deep ? [selectedRowKeys, tbData] : selectedRowKeys, () => {
    selectedRows.value = unionBy([...toValue(tbData), ...toValue(selectedRows)], rowKey)
      .filter(row => toValue(selectedRowKeys).includes(row[rowKey] as never))
  })

  return selectedRows
}
