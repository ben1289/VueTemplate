import type { PopoverTableProps } from './components/PopoverTable'

export type ModelValue = string | number | string[] | number[]

export interface SearchInputProps extends Pick<PopoverTableProps, 'columns' | 'fetchData'> {
  fieldNames?: {
    valueKey?: string
    labelKey?: string
    rowKey?: string
  }
  multiple?: boolean
}
