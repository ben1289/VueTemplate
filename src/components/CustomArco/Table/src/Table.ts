import type { TableColumnData as ATableColumnData } from '@arco-design/web-vue'

export interface TableColumnData extends ATableColumnData {
  id?: string
}

export interface TableProps {
  id?: string
  columns?: TableColumnData[]
  total?: number
}
