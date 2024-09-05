import type { TableColumnData } from '@arco-design/web-vue'
import type { FetchData } from '../types'

export interface PopoverTableProps {
  columns: TableColumnData[]
  fetchData: FetchData
  alwaysFetch?: boolean
  rowKey: string
  multiple?: boolean
  disabled?: boolean
}
