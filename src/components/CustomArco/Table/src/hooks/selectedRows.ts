import type { MaybeRef, Ref } from 'vue'
import { unionBy } from 'lodash-es'

export default function useSelectedRows(
  selectedRowKeys: MaybeRef<string[] | number[]>,
  tbData: MaybeRef<Record<string, any>[]>,
  rowKey = 'id',
): Ref<Record<string, any>[]> {
  const selectedRows = ref<Record<string, any>[]>([])

  watch(selectedRowKeys, () => {
    selectedRows.value = unionBy([...toValue(selectedRows), ...toValue(tbData)], rowKey)
      .filter(row => toValue(selectedRowKeys).includes(row[rowKey] as never))
  })

  return selectedRows
}
