import type { TableColumnData } from '@arco-design/web-vue'
import type { FetchData } from '../types'

export interface PopoverTableProps {
  columns: TableColumnData[]
  fetchData: FetchData
  rowKey: string
  multiple?: boolean
}
