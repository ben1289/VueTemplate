import type { MaybeRef, Ref } from 'vue'
import { unionBy } from 'lodash-es'

export default function useSelectRows(
  selectRowKeys: MaybeRef<string[] | number[]>,
  tbData: MaybeRef<Record<string, any>[]>,
  rowKey = 'id',
): Ref<Record<string, any>[]> {
  const selectRows = ref<Record<string, any>[]>([])

  watch(selectRowKeys, () => {
    selectRows.value = unionBy([...toValue(selectRows), ...toValue(tbData)], rowKey)
      .filter(row => toValue(selectRowKeys).includes(row[rowKey] as never))
  })

  return selectRows
}
